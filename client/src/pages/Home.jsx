import SwitchableTabs from "../components/tabs/SwitchableTabs";
import ImageGallery from "../components/gallery/ImageGallery";

export default function Home() {
  return (
    <div className="px-0 py-[2rem]">
      <SwitchableTabs>
        <ImageGallery initialURL="/s3?page=1&limit=6" />
        <ImageGallery initialURL="/drive?page=1&limit=6" />
      </SwitchableTabs>
    </div>
  );
}
