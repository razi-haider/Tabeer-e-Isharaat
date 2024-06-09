// import "./styles.css";

// export const renderTime = ({ remainingTime }) => {
//   // if (remainingTime === 0) {
//   //   return <div className="timer">Time's Up!</div>;
//   // }

//   return (
//     <div className="timer">
//       {/* <div className="text">Remaining</div> */}
//       {(remainingTime===0) ? }
//       <div className="value">{remainingTime}</div>
//       {/* <div className="text">seconds</div> */}
//     </div>
//   );
// };
import "./styles.css";

export const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      {remainingTime === 0 ? (
        <div className="text">Time's Up!</div>
      ) : (
        <>
          {/* <div className="text">Remaining</div> */}
          <div className="value">{remainingTime}</div>
          {/* <div className="text">seconds</div> */}
        </>
      )}
    </div>
  );
};
