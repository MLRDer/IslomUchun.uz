const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const errors = require("./constants/errors");
const Time = require("./models/Time");

const rp = require("request-promise");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

const city_codes = [1, 4, 5, 9, 13, 14, 15, 16, 18, 21, 25, 26, 27];
const cities = [
    "Andijon",
    "Buxoro",
    "Guliston",
    "Jizzax",
    "Marg'ilon",
    "Navoiy",
    "Namangan",
    "Nukus",
    "Samarqand",
    "Xiva",
    "Qarshi",
    "Qo'qon",
    "Toshkent",
];

const cities_ru = [
    "Андижон",
    "Бухоро",
    "Гулистон",
    "Жиззах",
    "Марғилон",
    "Навоий",
    "Наманган",
    "Нукус",
    "Самарқанд",
    "Хива",
    "Қарши",
    "Қўқон",
    "Тошкент",
];

const days = {
    Душанба: "Dushanba",
    Сешанба: "Seshanba",
    Чоршанба: "Chorshanba",
    Пайшанба: "Payshanba",
    Жума: "Juma",
    Шанба: "Shanba",
    Якшанба: "Yakshanba",
};

const months = {
    январь: "Yanvar",
    февраль: "Fevral",
    март: "Mart",
    апрель: "Aprel",
    май: "May",
    июнь: "Iyun",
    июль: "Iyul",
    август: "Avgust",
    сентябрь: "Sentabr",
    октябрь: "Oktabr",
    ноябрь: "Noyabr",
    декабрь: "Dekabr",
};

const hijri_months = {
    "жумадул аввал": "Jumadul avval",
    "жумадис сони": "Jumadis soni",
    ражаб: "Rajab",
    шаъбон: "Shabon",
    Рамазон: "Ramazon",
    шаввол: "Shavvol",
    зулқаъда: "Zulqada",
    зулҳижжа: "Zulhijja",
    муҳаррам: "Muharram",
    сафар: "Safar",
    "рабиъул аввал": "Rabiul avval",
    "рабиъус сони": "Rabius soni",
};

const fun = async () => {
    const month = 1;
    await Promise.all(
        city_codes.map(async (city) => {
            const base_url = `https://islom.uz/vaqtlar/${city}/${month}`;

            let data;

            rp(base_url)
                .then(function (html) {
                    //success!
                    let $ = cheerio.load(html);
                    cheerioTableparser($);
                    data = $("table").parsetable(true, true, true);

                    let time = {};
                    let times;
                    let index = city_codes.indexOf(city);

                    time.year = 2021;
                    time.month_ru = data[1][0];
                    time.month = months[data[1][0]];
                    time.hijri_month_ru = data[0][0];
                    time.hijri_month = `${
                        hijri_months[data[0][0].split(" / ")[0]]
                    } / ${hijri_months[data[0][0].split(" / ")[1]]}`;
                    time.region = cities[index];
                    time.region_ru = cities_ru[index];
                    time.data = [];

                    for (let i = 1; i < data[0].length - 1; i++) {
                        times = {
                            day: data[1][i],
                            hijri_day: data[0][i],
                            day_name_ru: data[2][i],
                            day_name: days[data[2][i]],
                            fajr: data[3][i],
                            sunrise: data[4][i],
                            dhuhr: data[5][i],
                            asr: data[6][i],
                            maghrib: data[7][i],
                            isha: data[8][i],
                        };
                        time.data.push(times);
                    }

                    //await Time.create(time);
                    console.log(time);
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
    );
};

fun();
