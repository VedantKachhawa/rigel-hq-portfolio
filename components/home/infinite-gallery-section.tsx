"use client";

import dynamic from "next/dynamic";
import type { GalleryImage } from "@/components/infinite-gallery";
import { cloudinaryVideoPoster } from "@/lib/cloudinary";

const InfiniteGallery = dynamic(() => import("@/components/infinite-gallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] bg-black rounded-2xl animate-pulse" />
  ),
});

const portrait = (url: string): GalleryImage => ({ url, width: 675, height: 900 });
const landscape = (url: string): GalleryImage => ({ url, width: 1280, height: 720 });
const videoFrame = (videoUrl: string): GalleryImage => landscape(cloudinaryVideoPoster(videoUrl));

const GALLERY_IMAGES: GalleryImage[] = [
  // Kaleidogami
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269505/WhatsApp_Image_2026-05-25_at_3.34.03_AM_3_z3euyc.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269506/WhatsApp_Image_2026-05-25_at_3.34.03_AM_4_dss7m3.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269508/WhatsApp_Image_2026-05-25_at_3.34.03_AM_5_mcahol.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269509/WhatsApp_Image_2026-05-25_at_3.34.03_AM_6_tul2wd.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269511/WhatsApp_Image_2026-05-25_at_3.34.03_AM_7_k0tg2q.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269512/WhatsApp_Image_2026-05-25_at_3.34.03_AM_8_g8tyh9.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269514/WhatsApp_Image_2026-05-25_at_3.34.03_AM_9_izclxl.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269516/WhatsApp_Image_2026-05-25_at_3.34.03_AM_10_e690tp.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269517/WhatsApp_Image_2026-05-25_at_3.34.03_AM_11_z0yjvh.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269519/WhatsApp_Image_2026-05-25_at_3.34.03_AM_oiinhp.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269520/WhatsApp_Image_2026-05-25_at_3.34.03_AM_1_lsoqcm.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269522/WhatsApp_Image_2026-05-25_at_3.34.03_AM_2_xj6fhw.jpg"),
  // Orphic
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247209/WhatsApp_Image_2026-05-25_at_5.05.35_PM_csq9lj.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247208/WhatsApp_Image_2026-05-25_at_5.05.36_PM_1_tsqsb0.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247207/WhatsApp_Image_2026-05-25_at_5.05.36_PM_ucjbq5.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247206/WhatsApp_Image_2026-05-25_at_5.05.35_PM_7_fgqkny.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247205/WhatsApp_Image_2026-05-25_at_5.05.35_PM_6_syntue.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247204/WhatsApp_Image_2026-05-25_at_5.05.35_PM_5_xsttw1.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247203/WhatsApp_Image_2026-05-25_at_5.05.35_PM_4_wx4uc2.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247202/WhatsApp_Image_2026-05-25_at_5.05.35_PM_3_e0jl0m.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247202/WhatsApp_Image_2026-05-25_at_5.05.35_PM_2_cifsoz.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247201/WhatsApp_Image_2026-05-25_at_5.05.35_PM_1_fvkfvg.jpg"),
  // SHANI
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268863/WhatsApp_Image_2026-05-26_at_12.46.57_AM_2_qnvjfp.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268864/WhatsApp_Image_2026-05-26_at_12.46.57_AM_3_egw45p.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268865/WhatsApp_Image_2026-05-26_at_12.46.57_AM_4_pqwp9c.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268867/WhatsApp_Image_2026-05-26_at_12.46.57_AM_5_q8rxhn.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268868/WhatsApp_Image_2026-05-26_at_12.46.57_AM_6_pzdwgc.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268870/WhatsApp_Image_2026-05-26_at_12.46.57_AM_7_trisw6.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268871/WhatsApp_Image_2026-05-26_at_12.46.57_AM_8_nmtvlw.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268872/WhatsApp_Image_2026-05-26_at_12.46.57_AM_oyfquq.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268874/WhatsApp_Image_2026-05-26_at_12.46.57_AM_1_qlxecn.jpg"),
  // NAVIRA
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268781/WhatsApp_Image_2026-05-26_at_2.28.07_AM_3_vobioq.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268782/WhatsApp_Image_2026-05-26_at_2.28.07_AM_4_fq0qhm.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268782/WhatsApp_Image_2026-05-26_at_2.28.07_AM_5_z5frma.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268783/WhatsApp_Image_2026-05-26_at_2.28.07_AM_6_k5jqr1.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268785/WhatsApp_Image_2026-05-26_at_2.28.06_AM_ihwzm2.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268786/WhatsApp_Image_2026-05-26_at_2.28.07_AM_e8cikz.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268787/WhatsApp_Image_2026-05-26_at_2.28.07_AM_1_qe0i6m.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268789/WhatsApp_Image_2026-05-26_at_2.28.07_AM_2_xmhpjx.jpg"),
  // SOLCHAKRA
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268154/WhatsApp_Image_2026-05-26_at_2.56.36_AM_5_vpdj8z.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268155/WhatsApp_Image_2026-05-26_at_2.56.37_AM_a7xf5g.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268156/WhatsApp_Image_2026-05-26_at_2.56.37_AM_1_y9jqwy.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268158/WhatsApp_Image_2026-05-26_at_2.56.37_AM_2_f7otav.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268159/WhatsApp_Image_2026-05-26_at_2.56.36_AM_zs3os8.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268160/WhatsApp_Image_2026-05-26_at_2.56.36_AM_1_vazmeg.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268161/WhatsApp_Image_2026-05-26_at_2.56.36_AM_2_wpv2f8.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268162/WhatsApp_Image_2026-05-26_at_2.56.36_AM_3_igvb5p.jpg"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268163/WhatsApp_Image_2026-05-26_at_2.56.36_AM_4_a05x3y.jpg"),
  // Malabar
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243758/Untitled_design_41_l9ejrx.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243732/Untitled_design_42_ozmhrd.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243732/Untitled_design_43_nhojtm.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243742/Untitled_design_45_z4s21l.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_46_kcefl5.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_47_f8uhnr.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243314/Untitled_design_48_olq67c.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243733/Untitled_design_48_yuoy0c.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_49_vduh3m.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_50_taqy2c.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243735/Untitled_design_51_lsqknm.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243736/Untitled_design_52_jujdrc.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243739/Untitled_design_53_rmdqrq.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243737/Untitled_design_54_gfl9du.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243738/Untitled_design_55_fn0p9p.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243742/Untitled_design_56_k3fqra.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_57_ouc9fk.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_58_stk47m.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243743/Untitled_design_59_bpmska.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243746/Untitled_design_60_hg2g0n.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243743/Untitled_design_61_sbbsau.png"),
  portrait("https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_44_cjoc7h.png"),
  // Supreme
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244201/WhatsApp_Image_2026-05-25_at_1.52.44_AM_lecpij.jpg", width: 675, height: 1200 },
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244201/WhatsApp_Image_2026-05-25_at_1.52.45_AM_6_nrzcel.jpg", width: 675, height: 1200 },
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244200/WhatsApp_Image_2026-05-25_at_1.52.45_AM_5_je7q3r.jpg", width: 675, height: 1200 },
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244199/WhatsApp_Image_2026-05-25_at_1.52.45_AM_4_mgmitt.jpg", width: 675, height: 1200 },
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244198/WhatsApp_Image_2026-05-25_at_1.52.45_AM_3_szpejc.jpg", width: 675, height: 1200 },
  { url: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244198/WhatsApp_Image_2026-05-25_at_1.52.45_AM_2_fddnjp.jpg", width: 675, height: 1200 },
  // Video first frames — landscape
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176766/sol_1_ahmaet.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176766/sol_2_mbccrk.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176746/sol_3_fkiub3.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176769/sol_4_zkt8oo.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176717/sol_5_sr9vgm.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780177004/ALDAR_1_d5jcit.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780177243/ALDAR_2_1_p27r4t.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236550/Sobha_1_1_yqftdc.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236629/Sobha_2_1_rmd7rl.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236631/Sobha_3_1_wpipct.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236608/Sobha_4_1_pfy2vh.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242781/Ralph_1_2_1_cwohfm.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242765/Ralph_2_2_1_utfrtg.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242743/Ralph_3_2_1_x5b5pg.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780267964/hersheys_1_dc0gsd.mp4"),
  videoFrame("https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780266859/WhatsApp_Video_2026-06-01_at_2.31.46_AM_g0bbs5.mp4"),
];

export function InfiniteGallerySection() {
  return (
    <section className="w-full px-6 sm:px-10 py-6">
      <div className="mx-auto w-full max-w-275">
        <InfiniteGallery
          images={GALLERY_IMAGES}
          height="70vh"
          width="100%"
          className="rounded-2xl overflow-hidden"
          backgroundColor="#0a0a0a"
          fogColor="#0a0a0a"
          fogNear={100}
          fogFar={280}
          density={4}
          imageSize={12}
          cellSize={100}
          viewRange={2}
          dragSpeed={1}
          driftAmount={6}
          friction={0.9}
          autoZoom={false}
          imageRadius={0.05}
          allowImageFocusOnClick={true}
        />
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-foreground/20">
          Drag to explore · Click to focus
        </p>
      </div>
    </section>
  );
}
