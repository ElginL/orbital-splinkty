const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

admin.initializeApp();
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/getData', async (req, res) => {
    // Grab the image's base64.
    const base64 = req.body.base64;
    
    const projectId = "receipt-scanning-354106";
    const location = 'us';
    const processorId = '84b2cc6fdd051518';
    const keyFilename = './receipt-scanning-file.json';

    const {DocumentProcessorServiceClient} =
        require('@google-cloud/documentai').v1beta3;

    // Instantiates a client
    const client = new DocumentProcessorServiceClient({
        keyFilename
    });

    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    const request = {
        name,
        rawDocument: {
            content: base64,
            mimeType: 'image/jpeg'
        }
    }

    // Recognizes text entities in the jpeg document
    const [result] = await client.processDocument(request);

    const {document} = result;
    const {text} = document;

    // Receipt information to be stored
    const itemsDescription = [];
    const prices = [];
    const quantities = [];

    // It is guaranteed to only have one page, because our camera and gallery only allows
    // one image.
    const page = document.pages[0];

    for (const table of page.tables) {
        const numOfColumns = table.headerRows[0].cells.length;

        for (const row of table.bodyRows) {
            let quantityAdded = false;
            if (rowContainsPriceColumn(numOfColumns, row)) {
                const rowCells = row.cells;
                for (let i = 0; i < rowCells.length; i++) {
                    const cellText = JSON.stringify(getText(rowCells[i].layout.textAnchor, text));
                    const filteredCellText = cellText.includes("\\n")
                        ? cellText.substring(1, cellText.length - 3).trim()
                        : cellText.substring(1, cellText.length - 1).trim();
                    const bodyCellText = filteredCellText.replace("\\n", " ");
                    
                    if (numOfColumns === 3) {
                        if (i === 0) {
                            const quantity = bodyCellText.match(/\d/g);
                            quantities.push(parseInt(quantity.join("")));
                        } else if (i === 1) {
                            if (isNonReceiptItem(bodyCellText)) {
                                quantities.pop();
                                break;
                            }

                            itemsDescription.push(bodyCellText);
                        } else {
                            prices.push(convertToPrice(bodyCellText));
                        }
                    } else if (numOfColumns === 2) {
                        if (!quantityAdded) {
                            quantities.push(1);
                            quantityAdded = true;
                        }

                        if (i === 0) {
                            let indexOfFirstAlphabet = 0;
                            const indexOfNumber = indexOfNumberInFirstSixLetters(bodyCellText);
                            if (indexOfNumber !== -1) {
                                for (let i = indexOfNumber; i < bodyCellText.length; i++) {
                                    if (isAlpha(bodyCellText.charAt(i))) {
                                        indexOfFirstAlphabet = i;
                                        break;
                                    }
                                }

                                const description = bodyCellText.substring(indexOfFirstAlphabet);

                                if (isNonReceiptItem(description)) {
                                    quantities.pop();
                                    break;
                                }

                                itemsDescription.push(description);

                                quantities.pop();
                                quantities.push(parseInt(bodyCellText.substring(indexOfNumber, indexOfFirstAlphabet).trim()));
                            } else {
                                if (isNonReceiptItem(bodyCellText)) {
                                    quantities.pop();
                                    break;
                                }

                                itemsDescription.push(bodyCellText);
                            }
                        } else {
                            prices.push(convertToPrice(bodyCellText));
                        }
                    }
                }
            }
        }
    }

    function indexOfNumberInFirstSixLetters(text) {
        for (let i = 0; i < 6; i++) {
            if (/\d/.test(text.charAt(i))) {
                return i;
            }
        }
        
        return -1;
    }

    function isAlpha(ch) {
        return /^[A-Z]$/i.test(ch);
    }

    function rowContainsPriceColumn(columnCount, row) {
        let count = 0;
        for (const bodyCell of row.cells) {
            const txt = JSON.stringify(getText(bodyCell.layout.textAnchor, text));
            const bodyCellText = txt.substring(1, txt.length - 3);
            
            if (isPrice(bodyCellText)) {
                count += 1;
            }
        }
            
        return count === 2 && columnCount === 3 || count === 1 && columnCount === 2;
    }

    function isPrice(text) {
        const price = mapPrice(text);
        
        return price.length <= 6 && /^(\d+)?([.]?\d{0,2})?$/.test(price);
    }

    function isNonReceiptItem(item) {
        const NOT_ITEMS = [
            "price",
            "total",
            "cash",
            "tax",
            "st",
            "qty",
            "subtotal",
            "gst",
            "tender",
            "change",
            "discount",
            "service",
            "bank",
            "approval",
            "tip",
            "balance",
            "charge",
            "amount",
            "vat",
        ];

        for (const notItem of NOT_ITEMS) {    
            if (item.toUpperCase().includes(notItem.toUpperCase())) {
                return true;
            }
        }

        return false;
    }

    function mapPrice(text) {
        return text.includes(" ")
            ? text.substring(text.indexOf(" ") + 1)
            : text.includes("$")
            ? text.substring(text.indexOf("$") + 1)
            : text.includes("RM")
            ? text.substring(2)
            : text;
    }
        
    function convertToPrice(text) {
        const price = mapPrice(text);
        
        return parseFloat(price);
    }

        
    // Extract shards from the text field
    function getText(textAnchor, text) {
        if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
            return '';
        }

        // First shard in document doesn't have startIndex property
        const startIndex = textAnchor.textSegments[0].startIndex || 0;
        const endIndex = textAnchor.textSegments[0].endIndex;

        return text.substring(startIndex, endIndex);
    };

    res.status(200).send({
        data: [
            quantities,
            itemsDescription,
            prices
        ]
    });
})

exports.widgets = functions.https.onRequest(app);