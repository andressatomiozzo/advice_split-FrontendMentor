import styles from "./Loading.module.css";

const Loading = () => {
  return <div className={styles.loading} aria-busy="true"></div>;
};

export default Loading;