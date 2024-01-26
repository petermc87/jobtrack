import styles from "./TitleText.module.scss";

type TitleTypes = {
  text: String;
};

export default function TitleText({ text }: TitleTypes) {
  return <div className={styles.title}>{text}</div>;
}
