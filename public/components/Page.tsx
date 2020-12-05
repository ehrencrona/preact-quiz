import style from "./page.module.css";

interface Button {
  label: string;
  onClick: () => void;
}

/**
 * Wrapper around every page: contains a body and a list of buttons
 */
const Page = ({
  children,
  buttons,
  className = null,
}: {
  children: any;
  buttons: Button[];
  className: string;
}) => (
  <div className={[style.page].concat(className || []).join(" ")}>
    <div className={style.content}>{children}</div>
    <div className={style.buttons}>
      <div className={style.fade}></div>
      {buttons.map(({ label, onClick }, idx) => (
        <button key={idx} onClick={onClick}>
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default Page;
