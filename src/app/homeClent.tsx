"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Role, { ROLES } from "@/components/animatedRole";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "@/components/button";
import leafBgTop from "../../public/homepage/bg_leafDark_4_t.png";
import leafBgRight from "../../public/homepage/bg_leafDark_3_r.png";
import leafBgBottom from "../../public/homepage/bg_leafDark_2_b.png";
import leafBgLeft from "../../public/homepage/bg_leafDark_1_l.png";
import leafTop from "../../public/homepage/bg_leafTint_3_t.png";
import leafRight from "../../public/homepage/bg_leafTint_4_rb.png";
import leafBottom from "../../public/homepage/bg_leafTint_2_lb.png";
import leafLeft from "../../public/homepage/bg_leafTint_1_lt.png";
import Logo from "../../public/homepage/logo_hole_txt.png";

function Launch({ progress }: { progress: number }) {
  return (
    <>
      <div className="mt-8 flex gap-2">
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.EE} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.GG} initialDelay={0.8} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.PO} initialDelay={1.4} />
        </div>
        <div className="w-[30px] h-[30px]">
          <Role roleName={ROLES.SM} initialDelay={1.8} />
        </div>
      </div>
      <div className="w-4xl h-[8px] rounded-sm overflow-hidden">
        <div
          className="bg-primary h-[8px]"
          style={{ width: `${progress}%`, transition: "0.5s" }}
        />
      </div>
    </>
  );
}
function Intro() {
  const router = useRouter();
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = () => {
    setIsMoved(true);
    setTimeout(() => {
      router.push("/landing");
    }, 300);
  };

  return (
    <div
      className="relative w-full h-full bg-no-repeat"
      style={{
        backgroundImage: `url(${leafBgTop.src}), url(${leafBgRight.src}), url(${leafBgBottom.src}), url(${leafBgLeft.src})`,
        backgroundPosition: "top, top right, bottom, top left",
      }}
    >
      <div
        className={`absolute left-[30%] w-[50%] h-[50%] transition-all duration-400 ${
          isMoved ? "-top-[20%]" : "top-0"
        }`}
      >
        <Image src={leafTop} alt="" fill />
      </div>
      <div
        className={`absolute bottom-0 w-[50%] h-[80%] transition-all duration-500 ${
          isMoved ? "-right-[20%]" : "right-0"
        }`}
      >
        <Image src={leafRight} alt="" fill />
      </div>
      <div
        className={`absolute top-0 w-[30%] h-[70%] transition-all duration-300 ${
          isMoved ? "-left-[10%]" : "left-0"
        }`}
      >
        <Image src={leafLeft} alt="" fill />
      </div>
      <div
        className={`absolute left-0 w-[60%] h-[40%] transition-all duration-500 ${
          isMoved ? "-bottom-[20%]" : "bottom-0"
        }`}
      >
        <Image src={leafBottom} alt="" fill />
      </div>
      <div
        className="absolute bg-cover top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        style={{
          backgroundImage: `url(${Logo.src})`,
          width: Logo.width,
          height: Logo.height,
        }}
      >
        <div className="relative h-full">
          <h3
            className="absolute bottom-[30%] left-[50%] translate-x-[-50%] text-3xl font-bold text-center"
            style={{ bottom: ` ${Logo.height / 4}px` }}
          >
            深入敏捷の村一探究竟
          </h3>
          <div className="absolute bottom-[15%] left-[50%] translate-x-[-50%]">
            <Button.Primary
              type={BUTTON_TYPES.BUTTON}
              onClick={handleClick}
              size={BUTTON_SIZES.XL}
            >
              進入村莊
            </Button.Primary>
          </div>
        </div>
      </div>

      {/* <Link href="/landing">Landing Page</Link> */}
    </div>
  );
}

export default function HomeClient({ data }: { data: any }) {
  console.log(data);
  const [progress, setProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.min(100 - prev, Math.pow(prev / 10, 1.5) + 1);
        return prev + increment;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress >= 100) {
        setIsLaunching(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLaunching ? <Launch progress={progress} /> : <Intro />}
    </div>
  );
}
