import express from "express"
import puppeteer from "puppeteer";

const app = express()

let temperature = null

app.get('/test', (req, res) => {
    res.json('API running :)')
});

app.get('/temp', (req, res) => {
    (async () => {
        try {
            console.log("Starting browser")
            const browser = await puppeteer.launch({
                headless: true, // Change this to true for headless mode
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ],
            });

            console.log("browser started")
            const page = await browser.newPage();
            await page.goto('https://www.meteomedia.com/ca/meteo/quebec/montreal')

            await page.waitForSelector('#obs_data');

            // Get the text content of the element
            const elementText = await page.evaluate(() => {
                const element = document.getElementById('obs_data')
                const temp = element.getElementsByClassName("temp")[0];
                return temp ? temp.textContent : null;
            });

            console.log("Text from element:", elementText);
            temperature = elementText;

            console.log("finished")

            await browser.close(); // Close the browser when you're done

        } catch (error) {
            console.error(error);
        }
        res.json(temperature)
    })();

});





app.listen(8000, () => console.log("App running on port 8000"))