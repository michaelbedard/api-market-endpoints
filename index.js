import express from "express"
import puppeteer from "puppeteer";

const app = express()

app.get('/', (req, res) => {
    res.json('API running :)')
});

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
        await page.goto('https://google.com/')

        await page.screenshot({path: "photo.png"})
        console.log("finished")

        await browser.close(); // Close the browser when you're done

    } catch (error) {
        console.error(error);
    }
})();






app.listen(8000, () => console.log("App running on port 8000"))