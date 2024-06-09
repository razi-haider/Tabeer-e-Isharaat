import { LiteracyHomeContentVideo } from "./WelcomeVideo"
import MathsHomeContent1 from "../../../../../Assets/MathsHomeContent1.png"
import MathsHomeContent2 from "../../../../../Assets/MathsHomeContent2.png"
import Arrow from "../../../../../Assets/StudentDashboardContent1.png"

export const LiteracyHomeContent = (user) => {
    return (
        <>
            <div className="MathematicsHomeContent">

                {/* <LiteracyHomeContentVideo /> */}
                {(user.user==="Teacher") && 
                    <h1 className="gradientText">Hello, Instructor!</h1>
                }

            </div>
            <img src={MathsHomeContent1} className="MathsHomeImage1" />
            <img src={MathsHomeContent2} className="MathsHomeImage2" />
            <img src={Arrow} className="MathsHomeImage3" />
        </>

    )

}