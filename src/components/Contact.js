import React, { useState, useEffect, useRef } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../firebase/loginAPI';
import { sendPushNotification, updateNudgeTime } from '../firebase/notifications';
import { Timestamp } from 'firebase/firestore';
import PaymentModal from './PaymentModal';

const Contact = ({ item, profileImg }) => {
    const notifTokens = useSelector(state => state.users.notificationTokens);
    const [modalVisible, setModalVisible] = useState(false);

    // Cooldown in seconds
    const NUDGE_COOLDOWN = 300;
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(NUDGE_COOLDOWN);

    useEffect(() => {
        const lastNudge = NUDGE_COOLDOWN - (Timestamp.now().seconds - item.nudgeTime);
        timerRef.current = lastNudge;

        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTimer(timerRef.current);
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [item.nudgeTime]);

    return (
        <View style={styles.contact}>
            <View style={styles.userDisplay}>
                <Image
                    source={{ 
                        uri: profileImg,
                        cache: "only-if-cached" 
                    }} 
                    style={styles.contactImg}
                />
                <Text style={styles.name}>
                    {item.friend}
                </Text>
            </View>
            {
                (() => {
                    if (item.amount === 0) {
                        return (
                            <Text style={styles.zeroAmount}>
                                $0
                            </Text>
                        );
                    }

                    if (item.isOweFriend) {
                        return (
                            <View style={styles.paymentContainer}>
                                <Text style={styles.payAmount}>
                                    ${item.amount.toFixed(2)}
                                </Text>
                                <TouchableOpacity 
                                    style={styles.payBtn}
                                    onPress={() => setModalVisible(true)}>
                                    <Text style={styles.payText}>
                                        Pay
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                    return (
                        <View style={styles.paymentContainer}>
                            <Text style={styles.nudgeAmount}>
                                ${item.amount.toFixed(2)}
                            </Text>
                            {
                                timer === 0
                                    ? (
                                        <TouchableOpacity 
                                            style={styles.nudgeBtn}
                                            onPress={async () => {
                                                await sendPushNotification(
                                                    notifTokens[item.friend],
                                                    `${getCurrentUser()} sent you a poke!`,
                                                    `Please pay back ${item.amount.toFixed(2)}!`
                                                );

                                                await updateNudgeTime(item.id);
                                            }}>
                                            <Text style={styles.nudgeText}>
                                                Nudge
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                    : (
                                        <View>
                                            <Text style={styles.cooldownText}>
                                                Nudge Sent
                                            </Text>
                                            <Text style={styles.cooldownTimer}>
                                                Retry in {Math.ceil(timer / 60)}min
                                            </Text>
                                        </View>
                                    )
                            }
                        </View>
                    );
                })()
            }
            <PaymentModal 
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                item={item}
                notifToken={notifTokens[item.friend]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 5,
        padding: 10
    },
    contactImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        overflow: 'hidden'
    },
    cooldownText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cooldownTimer: {
        fontSize: 13,
    },
    name: {
        fontSize: 18
    },
    nudgeBtn: {
        backgroundColor: 'green',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    nudgeAmount: {
        color: 'green',
        fontSize: 18,
        marginBottom: 6
    },
    nudgeText: {
        color: 'white',
        textAlign: 'center'
    },
    payAmount: {
        color: 'red',
        fontSize: 20,
        marginBottom: 6
    },
    payBtn: {
        backgroundColor: 'orange',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    paymentContainer: {
        alignItems: 'center',
        width: 100
    },
    payText: {
        color: 'blue',
        textAlign: 'center'
    },
    userDisplay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    zeroAmount: {
        color: 'green',
        fontSize: 25,
        width: 80,
        textAlign: 'center'
    }
});

export default Contact;