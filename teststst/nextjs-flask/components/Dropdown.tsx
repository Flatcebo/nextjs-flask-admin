import { useState } from "react";

export default function Dropdown({
  mainButtonClick,
  mainButtonClassName,
  mainButtonName,
  mainButtonValue,
  mainButtonOnChange,
  mainButtonDefaultValue,
  button1,
  button1Name,
  button1Click,
  button2,
  button2Name,
  button2Click,
  button3,
  button3Name,
  button3Click,
  button4,
  button4Name,
  button4Click,
  button5,
  button5Name,
  button5Click,
  dropdownClassName,
}: any) {
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <div className="">
      {dropdown ? (
        <>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className={mainButtonClassName}
            type="button"
            defaultValue={mainButtonDefaultValue}
            onChange={mainButtonOnChange}
            onClick={() => {
              setDropdown(false);
            }}
          >
            {mainButtonName}
            <svg
              className="w-3.5 h-5.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div id="dropdown" className={dropdownClassName}>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              {button1 && (
                <li>
                  <button
                    type="button"
                    onClick={button1Click}
                    // onChange={sear}
                    // onClick={onClickResults}
                    // onSubmit={handleSubmit(onSubmits)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {button1Name}
                  </button>
                </li>
              )}
              {button2 && (
                <li>
                  <button
                    type="button"
                    onClick={button2Click}
                    // onChange={sear}
                    // onClick={onClickResults}
                    // onSubmit={handleSubmit(onSubmits)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {button2Name}
                  </button>
                </li>
              )}
              {button3 && (
                <li>
                  <button
                    type="button"
                    onClick={button3Click}
                    // onChange={sear}
                    // onClick={onClickResults}
                    // onSubmit={handleSubmit(onSubmits)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {button3Name}
                  </button>
                </li>
              )}
              {button4 && (
                <li>
                  <button
                    type="button"
                    onClick={button4Click}
                    // onChange={sear}
                    // onClick={onClickResults}
                    // onSubmit={handleSubmit(onSubmits)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {button4Name}
                  </button>
                </li>
              )}
              {button5 && (
                <li>
                  <button
                    type="button"
                    onClick={button5Click}
                    // onChange={sear}
                    // onClick={onClickResults}
                    // onSubmit={handleSubmit(onSubmits)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {button5Name}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      ) : (
        <>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className={mainButtonClassName}
            type="button"
            onClick={() => {
              setDropdown(true);
            }}
          >
            {mainButtonName}
            <svg
              className="w-3.5 h-5.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
