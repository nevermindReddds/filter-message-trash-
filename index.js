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
        const inputText = `

`;

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
