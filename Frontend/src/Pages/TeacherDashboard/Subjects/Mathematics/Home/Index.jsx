import MathsHomeContent1 from "../../../../../Assets/MathsHomeContent1.png";
import MathsHomeContent2 from "../../../../../Assets/MathsHomeContent2.png";
import Arrow from "../../../../../Assets/StudentDashboardContent1.png";

export const MathematicsHomeContent = () => {
    return (
        <>
            <div className="MathematicsHomeContent">
                {/* <LiteracyHomeContentVideo /> */}
            </div>
            <img src={MathsHomeContent1} className="MathsHomeImage1" />
            <img src={MathsHomeContent2} className="MathsHomeImage2" />
            <img src={Arrow} className="MathsHomeImage3" />
        </>
    );
};
