import { Link } from "react-router-dom";
import { textConfig } from "../../config";

const AuthWrapper = ({ children, ...props }) => {
  return (
    <div
      className={`h-screen p-5 flex flex-col bg-gradient-light dark:bg-gradient-dark`}
    >
      <Link to={"/"} replace={true} className="w-fit mx-auto">
        <h1 className="text-pink-700 text-center">{textConfig.title}</h1>
      </Link>
      <div className={"grow center-element"}>
        <div
          className="lg:h-full rounded-lg overflow-hidden 2xl:max-h-[28rem] 2xl:max-w-[50rem]  lg:max-w-[60rem] lg:max-h-[32rem] grid lg:grid-cols-2"
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
