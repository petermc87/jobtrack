import styles from "./TitleText.module.scss";

type TitleTypes = {
  text: String;
  style: any;
};

export default function TitleText({ text, style }: TitleTypes) {
  return (
    <div style={style} className={styles.title}>
      {text}
    </div>
  );
}
