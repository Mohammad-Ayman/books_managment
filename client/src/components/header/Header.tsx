import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";

import styles from "./styles/header.module.css";
import { DynamicAttributes } from "@/types/dynamicAttributes";

interface Props {
  inputProps?: DynamicAttributes;
}

const Header: React.FC<Props> = async (inputProps?) => {
  return (
    <header className={styles["header-container"]} {...inputProps}>
      <div className={styles["image-container"]}>
        <Link href={"/"}>
          <Image
            alt="byfood logo"
            src={Logo}
            width={1125}
            height={677}
            priority
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
