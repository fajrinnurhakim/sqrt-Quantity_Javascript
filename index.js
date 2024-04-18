const readline = require("readline");
const fs = require("fs").promises;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

(async () => {
    try {
        console.log("1. Program Akar pangkat 2");
        const input = await askQuestion("Masukkan bilangan genap: ");
        const x = parseInt(input);

        if (x < 0) {
            console.log("Tidak bisa input bilangan negatif");
        } else if (x % 2 !== 0) {
            console.log("Tidak bisa input bilangan ganjil");
        } else {
            const result = Math.sqrt(x);
            console.log(`Akar pangkat 2 dari ${x} adalah ${result}`);
        }

        console.log();

        console.log(
            "2. Menjumlahkan Quantity dari beberapa storage untuk productCode FBR00040101"
        );
        const data = await fs.readFile("./storage.json", "utf8");
        const storage = JSON.parse(data);

        let totalQuantityByStorageId = {};

        storage.forEach((product) => {
            if (product.productCode === "FBR00040101") {
                totalQuantityByStorageId[product.storageId] =
                    (totalQuantityByStorageId[product.storageId] || 0) +
                    product.quantity;
            }
        });

        Object.keys(totalQuantityByStorageId).forEach((storageId) => {
            console.log(
                `Storage ID: ${storageId}, Quantity: ${totalQuantityByStorageId[storageId]}`
            );
        });

        let totalQuantity = 0;

        storage.forEach((product) => {
            if (product.productCode === "FBR00040101") {
                totalQuantity += product.quantity;
            }
        });

        console.log(
            "Total quantity untuk productCode FBR00040101(FloBrand-DressBSPink) dari beberapa storageId:",
            totalQuantity
        );

        rl.close();
    } catch (err) {
        console.error(err);
        rl.close();
    }
})();

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
