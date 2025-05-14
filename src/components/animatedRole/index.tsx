"use client";
import Image from "next/image";
import styles from "./styles.module.scss";

import holeImg from "../../../public/roles/hole.png";
import RoleEEImg from "../../../public/roles/role_ee.png";
import RoleEELightImg from "../../../public/roles/role_ee_light.png";
import RolePOImg from "../../../public/roles/role_po.png";
import RolePOLightImg from "../../../public/roles/role_po_light.png";
import RoleGGImg from "../../../public/roles/role_gg.png";
import RoleGGLightImg from "../../../public/roles/role_gg_light.png";
import RoleSMImg from "../../../public/roles/role_sm.png";
import RoleSMLightImg from "../../../public/roles/role_sm_light.png";

const EE = "EE";
const PO = "PO";
const GG = "GG";
const SM = "SM";
export const ROLES = {
  [EE]: EE,
  [PO]: PO,
  [GG]: GG,
  [SM]: SM,
} as const;
export type RoleNameType = keyof typeof ROLES;

const getRoleImg = (roleName: RoleNameType) => {
  switch (roleName) {
    case ROLES[EE]:
      return { role: RoleEEImg, light: RoleEELightImg };
    case ROLES[GG]:
      return { role: RoleGGImg, light: RoleGGLightImg };
    case ROLES[SM]:
      return { role: RoleSMImg, light: RoleSMLightImg };
    case ROLES[PO]:
    default:
      return { role: RolePOImg, light: RolePOLightImg };
  }
};

interface roleProps {
  roleName?: RoleNameType;
  withAnimation?: boolean;
}

export default function Role({
  roleName = ROLES[PO],
  withAnimation = true,
}: roleProps) {

  return (
    <div
      className={`${styles.container} ${withAnimation && styles.animated}`}
      style={{ backgroundImage: `url(${holeImg.src})` }}
    >
      <Image
        src={getRoleImg(roleName).light.src}
        alt="role_light"
        className={`${styles.roleLight} ${withAnimation && styles.animated}`}
        width={getRoleImg(roleName).light.width}
        height={getRoleImg(roleName).light.height}
      />
      <Image
        src={getRoleImg(roleName).role}
        alt="role"
        className={`${styles.role} ${withAnimation && styles.animated}`}
        width={getRoleImg(roleName).role.width}
        height={getRoleImg(roleName).role.height}
      />
    </div>
  );
}
