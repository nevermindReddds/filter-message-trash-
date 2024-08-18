const { google } = require('googleapis');
const fs = require('fs');

// Функция для фильтрации строк
function filterLinesWithUSDAndPrice(inputText) {
    const lines = inputText.split('\n');
    const filteredLines = lines.filter(line => {
        const usdIndex = line.indexOf('USD');
        if (usdIndex !== -1) {
            const priceMatch = line.match(/(\d+(\.\d+)?)\s*USD/);
            if (priceMatch) {
                const price = parseFloat(priceMatch[1]);
                return price >= 39;
            }
        }
        return false;
    });
    return filteredLines.join('\n');
}

// Аутентификация Google Sheets API
async function authenticateGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'C:/Users/lenovo/Desktop/filtr/service-account-key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    
    });
    return auth.getClient();
}

// Функция для записи данных в Google Sheets
async function appendToGoogleSheets(auth, spreadsheetId, range, values) {
    const sheets = google.sheets({ version: 'v4', auth });
    const resource = {
        values: [values],
    };
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
    });
}

// Основной код
(async () => {
    try {
        const inputText = `ЩЕТКА СТЕКЛООЧИСТИТЕЛЯ ПРАВАЯ (98360F2600) - $17.05 USD
Retrying 1125406206B (Attempt 1)
Retrying 1125406206B (Attempt 2)
Retrying 1125406206B (Attempt 3)
БОЛТ (1125406206B) - Price not found
ЗАЖИМ-КАБЕЛЬ (8119933000) - $0.18 USD
ЭЛЕКТРОДВИГАТЕЛЬ И НАСОС В СБОРЕ-ОМЫВАТЕЛЬ ВЕТРОВОГО СТЕКЛА (985102W500) - $9.56 USD
ФИЛЬТР-ШАЙБА (985151F000) - $3.82 USD
CONNECTOR - WINDSHIELD WASHER (9851621100) - $0.18 USD
НАСОС ФАРООМЫВАТЕЛЯ (98521D9000) - $3.54 USD
НАСОС СТЕКЛООМЫВАТЕЛЯ (98610AT100) - $59.54 USD
БАЧЕК ЖИДКОСТИ СТЕКЛООМЫВАТЕЛЯ (98611AT100) - $19.09 USD
УПЛОТН. КОЛЬЦО-ОМЫВАТЕЛЬ ВЕТРОВОГО СТЕКЛА (9862214200) - $0.44 USD
УПЛОТН. КОЛЬЦО-ПЕРЕКЛЮЧАТЕЛЬ СКОРОСТИ РАБОТЫ ДВОРНИКОВ ВЕТРОВОГО СТЕКЛА (986223L000) - $1.73 USD
КОЛПАЧОК-РЕЗЕРВУАР ОМЫВАТЕЛЯ (98623G6000) - $0.94 USD
ЗАЖИМ-ШЛАНГ (986612T000) - $0.33 USD
ЗАЖИМ-ШЛАНГ (9866224000) - $0.33 USD
ШЛАНГ (9J70031047) - $4.78 USD
БОЛТ (1128106256B) - $0.75 USD
БОЛТ (1125406256B) - $0.17 USD
БОЛТ (1141306167C) - $0.83 USD
БОЛТ (1141306207C) - $1.51 USD
БОЛТ-ФЛАНЕЦ (1142506167P) - $0.54 USD
ГАЙКА (1327106007K) - $0.17 USD
Гайка с фланцем (1339606007K) - $7.95 USD
ШАЙБА (91981AT010) - $21.27 USD
УПЛОТНЯЮЩЕЕ КОЛЬЦО (919813X050) - $12.3 USD
ПРОВОДКА (91205AO731) - $3371.11 USD
Retrying 91205AO733 (Attempt 1)
Retrying 91205AO733 (Attempt 2)
Retrying 91205AO733 (Attempt 3)
ПРОВОДКА (91205AO733) - Price not found
УПЛОТНЯЮЩЕЕ КОЛЬЦО (919813S000) - $7.57 USD
КРОНШТЕЙН-МОНТАЖ ПРОВОДКИ (91931AO050) - $12.5 USD
КРЫШКА ТОКОРАСПРЕДЕЛИТЕЛЬНОЕ КОРОБКИ (91956AO300) - $33.69 USD
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT080) - $18.1 USD
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT090) - $18.45 USD
РЕЛЕ (952302P010) - $9.17 USD
РЕЛЕ (952302P030) - $2.52 USD
БОЛТ (1125406256B) - $0.17 USD
БОЛТ (1140508226K) - $1.25 USD
БОЛТ (1140306146B) - $0.19 USD
БОЛТ (1140308556K) - $0.42 USD
NUT - FLANGE PAINT CLEAR (1337606001) - $0.35 USD
ТЕРМИНАЛ БАТАРЕИ (+) (91982C7010) - $9.43 USD
КРЫШКА БАТАРЕИ (+) (91971F2100) - $9.91 USD
ПРОВОДКА (91840AO010) - $171.75 USD
БОЛТ (1127306167K) - $0.93 USD
ЖГУТ ПРОВОДОВ (91661AO010) - $35.72 USD
ПРИВОД РАЗЪЕМА ЗАРЯДКИ (91677GI100) - $237.17 USD
РАЗЪЕМ ЗАРЯДКИ В СБОРЕ (91684AO000) - $1950.6 USD
РАЗЪЕМ (МАШИНА-ВНЕШНИЙ ПОТРЕБИТЕЛЬ) (916B1CV030) - $652.13 USD
КОМПЛЕКТ ПРОВОДОВ ДЛЯ ПРИЦЕПА, С КОНТАКТНЫМИ ЭЛЕМЕНТАМИ НА КОНЦАХ, С В (91655AO040) - $333.74 USD
ПРОВОДА (91863AO010) - $40.61 USD
ПРОВОДКА (91686GI030) - $460.51 USD
КРОНШТЕЙ ПРОВОДКИ (91931AO040) - $10.21 USD
БЛОК МОНТАЖНЫЙ ВЫСОКОВОЛЬТНЫЙ (91958AO010) - $1983.97 USD
Retrying 91958AO110 (Attempt 1)
Retrying 91958AO110 (Attempt 2)
Retrying 91958AO110 (Attempt 3)
ПРОКЛАДОЧНОЕ КОЛЬЦО (91958AO110) - Price not found
ЖГУТ ПРОВОДОВ - ДВ БАГАЖНИКА (91650AO040) - $120.47 USD
КРЫШКА РАЗЪЕМА (91963AO010) - $10.28 USD
ПРИВОД МЕХАНИЗМА ОТКРЫТИЯ ЛЮЧКА РОЗЕТКИ (91677JI100) - $210.52 USD
БОЛТ-ФЛАНЕЦ (1142506167P) - $0.54 USD
ГАЙКА С ШАЙБОЙ (1327106001) - $0.21 USD
Retrying 91105AO900 (Attempt 1)
Retrying 91105AO900 (Attempt 2)
Retrying 91105AO900 (Attempt 3)
ПРОВОДКА КУЗОВА (91105AO900) - Price not found
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT010) - $20.78 USD
Retrying 91950AO011 (Attempt 1)
Retrying 91950AO011 (Attempt 2)
Retrying 91950AO011 (Attempt 3)
СОЕД. КОРОБКА БЛОКА РЕЛЕ (91950AO011) - Price not found
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT020) - $21.27 USD
РАСПРЕДЕЛИТЕЛЬНАЯ КОРОБКА-ИНТЕГРАЛЬНАЯ СХЕМА В МОДУЛЬНОМ ИСПОЛНЕНИИ (91940AT030) - $52.44 USD
БОЛТ-ФЛАНЕЦ (1142506167P) - $0.54 USD
ГАЙКА С ШАЙБОЙ (1327106001) - $0.21 USD
Retrying 91105AO900 (Attempt 1)
Retrying 91105AO900 (Attempt 2)
Retrying 91105AO900 (Attempt 3)
ПРОВОДКА КУЗОВА (91105AO900) - Price not found
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT010) - $20.78 USD
Retrying 91950AO011 (Attempt 1)
Retrying 91950AO011 (Attempt 2)
Retrying 91950AO011 (Attempt 3)
СОЕД. КОРОБКА БЛОКА РЕЛЕ (91950AO011) - Price not found
КОЖУХ ЭЛЕКТРОПРОВОДКИ (91961AT020) - $21.27 USD
РАСПРЕДЕЛИТЕЛЬНАЯ КОРОБКА-ИНТЕГРАЛЬНАЯ СХЕМА В МОДУЛЬНОМ ИСПОЛНЕНИИ (91940AT030) - $52.44 USD`;

        // Фильтрация текста
        const filteredText = filterLinesWithUSDAndPrice(inputText);
        console.log(filteredText);

        // Разбиваем на строки для записи в Google Sheets
        const filteredLines = filteredText.split('\n');

        // Аутентификация
        const auth = await authenticateGoogleSheets();

        // Идентификатор и диапазон Google Sheets (замените на свои значения)
        const spreadsheetId = 'your-spreadsheet-id';
        const range = 'Sheet1!A1'; // Замените на нужный диапазон

        // Запись в Google Sheets
        for (const line of filteredLines) {
            await appendToGoogleSheets(auth, spreadsheetId, range, [line]);
        }

        console.log('Data has been appended to Google Sheets.');

    } catch (error) {
        console.error('Error:', error);
    }
})();
