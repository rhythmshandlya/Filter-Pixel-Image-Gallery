import SwitchableTabs from "../components/tabs/SwitchableTabs";
import ImageGallery from "../components/gallery/ImageGallery";

export default function Home() {
  return (
    <div className="px-0 py-[2rem]">
      <SwitchableTabs>
        <div>
          <ImageGallery />
        </div>
        <div></div>
      </SwitchableTabs>
    </div>
  );
}
