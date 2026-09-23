import React, { useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start().catch((error) => {
    console.log("No support NFC", error);
});

export default function CardReaderNfc() {
    const [log, setLog] = useState('');
    const [cardId, setCardId] = useState('');

    const readLog = async (idm: string) => {
        try {
            const idmBytes = idm.match(/.{1,2}/g)?.map(b => parseInt(b, 16)) || [];

            // Service Code yang terbukti terbuka di log sebelumnya
            const activeServices = [
                { name: '0x1012', bytes: [0x12, 0x10] },
                { name: '0x200C', bytes: [0x0C, 0x20] },
                { name: '0x1010', bytes: [0x10, 0x10] },
            ];

            console.log('=== 🔎 MEMINDAI BLOCK 0 - 9 PADA SEKTOR KMT ===');

            for (const service of activeServices) {
                console.log(`\n--- Memeriksa Service ${service.name} ---`);

                // Looping membaca Block 0 sampai Block 9
                for (let blockIdx = 0; blockIdx < 10; blockIdx++) {
                    const command = [
                        0x10, 0x06,
                        ...idmBytes,
                        0x01, ...service.bytes,
                        0x01, 0x80, blockIdx // Read Block ID = blockIdx
                    ];

                    const res = await NfcManager.transceive(command).catch(() => null);

                    if (res && res[10] === 0x00 && res[11] === 0x00) {
                        const raw = Array.from(res.slice(13, 29));
                        const hexStr = raw.map(b => b.toString(16).padStart(2, '0')).join(' ');

                        console.log(`[Block ${blockIdx}] Raw Hex: ${hexStr}`);

                        // Cek Saldo 2-Byte & 4-Byte di setiap offset
                        for (let i = 0; i < raw.length - 1; i++) {
                            const val16 = raw[i] | (raw[i + 1] << 8);

                            // Validasi Logika KRL: Rp 1.000 - Rp 1.000.000 & Harus Kelipatan 500
                            if (val16 >= 1000 && val16 <= 1000000 && val16 % 500 === 0) {
                                console.log(`  🎉 CANDIDATE FOUND! Service ${service.name} [Block ${blockIdx}, Byte ${i}-${i + 1}] -> Rp ${val16.toLocaleString('id-ID')}`);
                            }
                        }
                    } else {
                        console.log('Gak ada yang masuk pak eko');
                    }
                }
            }

        } catch (err) {
            console.error('Read Error:', err);
        }
    }

    const readKMT = async () => {
        try {
            setLog('Silakan tempelkan Kartu KMT KRL...');
            setCardId('');

            await NfcManager.requestTechnology([
                NfcTech.NfcF,
                NfcTech.FelicaIOS
            ]);

            if (Platform.OS === 'android') {
                await NfcManager.setTimeout(5000);
            }

            const tag = await NfcManager.getTag();

            console.log('TAG:', JSON.stringify(tag, null, 2));
            console.log('TAG ID:', tag?.id);

            // Jangan langsung menganggap tag.id adalah IDm
            if (tag?.id) {
                console.log('IDm:', tag.id);
                await readLog(tag.id);
                setLog('Success tap card');
                setCardId(tag.id);
            }

        } catch (e) {
            console.error('NFC ERROR:', e);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logText}>{log}</Text>

            {cardId && (
                <Text style={styles.cardText}>
                    IDm Kartu (UID): {cardId}
                </Text>
            )}

            <TouchableOpacity style={styles.btn} onPress={readKMT}>
                <Text style={styles.btnText}>Tap Kartu KMT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cardText: { fontSize: 18, fontWeight: 'bold', marginVertical: 20, color: '#333' },
    logText: { fontSize: 16, color: 'gray', marginBottom: 10 },
    btn: { backgroundColor: '#E52B20', padding: 15, borderRadius: 8, marginTop: 20 }, // Warna merah khas KRL
    btnText: { color: 'white', fontWeight: 'bold' }
});