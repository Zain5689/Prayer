import { useEffect, useState } from "react";
import Prayer from "../prayer/prayer";
import styles from "./Home.module.scss";
import axios from "axios";

const { topSec, container, cit } = styles;
const Home = () => {
  const cities = [
    { name: "القاهرة", en: "Cairo" },
    { name: "الجيزة", en: "Giza" },
    { name: "الإسكندرية", en: "Alexandria" },
    { name: "الإسماعيلية", en: "Ismailia" },
    { name: "بورسعيد", en: "Port Said" },
    { name: "بني سويف", en: "Beni Suef" },
  ];
  const [time, setime] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [date, setdate] = useState("");

  useEffect(() => {
    const fetchPrayer = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity/02-10-2024?city=Eg&country=${selectedCity}`
        );
        console.log(response.data.data.date.gregorian.date);
        setdate(response.data.data.date.gregorian.date);
        setime(response.data.data.timings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayer(); // Call the fetchPrayer function here
  }, [selectedCity]);

  const formDate = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`;
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <section>
        <div className={container}>
          <div className={topSec}>
            <div className={cit}>
              <h3>المدينة</h3>
              <select onChange={handleCityChange}>
                {cities.map((city) => (
                  <option key={city.en} value={city.en}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={date}>
              <h3>التاريخ</h3>
              <h4>{date}</h4>
            </div>
          </div>
          <div>
            <Prayer name="الفجر" time={formDate(time.Fajr)} />
            <Prayer name="الظهر" time={formDate(time.Dhuhr)} />
            <Prayer name="العصر" time={formDate(time.Asr)} />
            <Prayer name="المغرب" time={formDate(time.Maghrib)} />
            <Prayer name="العشاء" time={formDate(time.Isha)} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
