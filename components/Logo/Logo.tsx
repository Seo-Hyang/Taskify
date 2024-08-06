import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";

interface LogoProps {
  text: string;
}

function Logo({ text }: LogoProps) {
  return (
    <div className={styles["logo-container"]}>
      <Link href="/">
        <Image
          width={200}
          height={280}
          src={"images/logo/main.svg"}
          alt="로고 이미지"
        />
      </Link>
      <h1>{text}</h1>
    </div>
  );
}

export default Logo;
