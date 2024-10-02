import styles from "./prayer.module.scss";
const { prayer, prayerTime, prayerName } = styles;

// eslint-disable-next-line react/prop-types
const Prayer = ({ name, time }) => {
  return (
    <>
      <div className={prayer}>
        <p className={prayerName}>{name}</p>
        <p className={prayerTime}>{time}</p>
      </div>
    </>
  );
};
export default Prayer;
