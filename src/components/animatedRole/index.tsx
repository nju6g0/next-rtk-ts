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

const ee = "EE";
const po = "PO";
const gg = "GG";
const sm = "SM";
export const ROLES = {
  [ee]: ee,
  [po]: po,
  [gg]: gg,
  [sm]: sm,
} as const;
type RoleName = keyof typeof ROLES;

const getRoleImg = (roleName: RoleName) => {
  switch (roleName) {
    case ROLES[ee]:
      return { role: RoleEEImg, light: RoleEELightImg };
    case ROLES[gg]:
      return { role: RoleGGImg, light: RoleGGLightImg };
    case ROLES[sm]:
      return { role: RoleSMImg, light: RoleSMLightImg };
    case ROLES[po]:
    default:
      return { role: RolePOImg, light: RolePOLightImg };
  }
};

interface AnimatedRoleProps {
  roleName?: RoleName;
  withAnimation?: boolean;
}

export default function Role({
  roleName = ROLES[po],
  withAnimation = true,
}: AnimatedRoleProps) {
  console.log(holeImg);
  return (
    <div
      className={`${styles.container} ${withAnimation && styles.animated}`}
      style={{ backgroundImage: `url(${holeImg.src})` }}
    >
      <Image
        src={getRoleImg(roleName).light.src}
        alt="role_ee_light"
        className={`${styles.roleLight} ${withAnimation && styles.animated}`}
        width={getRoleImg(roleName).light.width}
        height={getRoleImg(roleName).light.height}
      />
      <Image
        src={getRoleImg(roleName).role}
        alt="role_ee"
        className={`${styles.role} ${withAnimation && styles.animated}`}
        width={getRoleImg(roleName).role.width}
        height={getRoleImg(roleName).role.height}
      />
    </div>
  );
}
