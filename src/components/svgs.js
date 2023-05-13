import React from "react";

function SVGS({ svgName, Class }) {
  var svgDict = {
    menu: <svg
      className={Class}
      viewBox="0 -1 21 21"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <title>menu_navigation_grid [#1528]</title>
        <desc>Created with Sketch.</desc> <defs> </defs>
        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-139.000000, -200.000000)"
            fill="#000000"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z"
                id="menu_navigation_grid-[#1528]"
              >
              </path>
            </g>
          </g>
        </g>
      </g>
    </svg>
    ,
    logo: (
      <svg
        className={Class}
        version={1.0}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="color" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="20%"
              style={{ stopColor: "#7953cd", stopOpacity: 1 }}
            />
            <stop
              offset="30%"
              style={{ stopColor: "#00affa", stopOpacity: 1 }}
            />
            <stop
              offset="70%"
              style={{ stopColor: "#0190cd", stopOpacity: 1 }}
            />
            <stop
              offset="80%"
              style={{ stopColor: "#764ada", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="url(#color)"
          stroke="none"
        >
          <path
            d="M1770 4709 l-735 -259 -455 0 c-427 0 -458 -2 -497 -20 -25 -11 -51
  -33 -63 -52 -20 -33 -20 -46 -20 -1778 0 -1724 0 -1745 20 -1778 11 -18 34
  -41 52 -52 32 -19 52 -20 731 -20 l697 0 0 -145 0 -145 -222 0 c-234 0 -287
  -7 -326 -43 -75 -69 -67 -188 17 -244 l34 -23 1557 0 1557 0 34 23 c84 56 92
  175 17 244 -39 36 -92 43 -325 43 l-223 0 0 145 0 145 698 0 c678 0 698 1 730
  20 18 11 41 34 52 52 20 33 20 54 20 1778 0 1732 0 1745 -20 1778 -12 19 -38
  41 -63 52 -39 18 -69 20 -457 20 l-415 0 -780 260 c-633 211 -789 260 -830
  259 -38 -1 -227 -64 -785 -260z m1340 -237 c293 -98 530 -181 524 -184 -5 -3
  -248 -85 -540 -182 l-531 -177 -489 172 c-269 94 -502 176 -518 182 -26 9 19
  27 475 187 277 98 513 178 524 179 11 0 261 -79 555 -177z m-1887 -404 l207
  -72 0 -329 c0 -363 1 -368 65 -407 17 -10 254 -104 527 -209 359 -138 509
  -191 539 -191 30 0 179 53 538 191 273 105 508 197 523 205 14 7 36 29 47 47
  20 33 21 47 21 355 l0 320 150 50 150 50 0 -441 c0 -412 1 -445 19 -477 20
  -38 88 -80 130 -80 50 0 114 41 139 90 22 44 22 47 22 507 l0 463 255 0 255 0
  0 -1540 0 -1540 -2250 0 -2250 0 0 1540 0 1540 353 0 352 0 208 -72z m922
  -323 c212 -74 398 -135 414 -135 15 0 202 59 416 130 214 72 393 130 397 130
  4 0 8 -85 8 -188 l0 -188 -410 -157 -410 -158 -410 158 -410 158 0 192 c0 116
  4 193 10 193 5 0 183 -61 395 -135z m1165 -3140 l0 -145 -750 0 -750 0 0 145
  0 145 750 0 750 0 0 -145z"
          />
          <path
            d="M672 2390 c-18 -11 -41 -34 -52 -52 -19 -31 -20 -51 -20 -378 0 -395
  0 -396 80 -437 43 -22 52 -23 374 -23 312 0 332 1 372 21 31 15 48 32 63 63
  20 40 21 59 21 377 0 373 -1 381 -69 426 -34 23 -37 23 -385 23 -333 0 -353
  -1 -384 -20z m528 -435 l0 -145 -145 0 -145 0 0 145 0 145 145 0 145 0 0 -145z"
          />
          <path
            d="M1868 2385 c-91 -62 -83 -209 14 -262 31 -17 99 -18 1285 -18 l1252
  0 28 21 c97 72 98 205 1 264 -32 20 -53 20 -1288 20 l-1255 0 -37 -25z"
          />
          <path
            d="M1880 1788 c-56 -39 -75 -73 -74 -134 0 -58 17 -91 68 -128 27 -21
  33 -21 1274 -24 l1247 -2 44 22 c59 31 84 76 78 146 -4 61 -28 99 -78 124 -32
  17 -114 18 -1280 18 l-1246 0 -33 -22z"
          />
        </g>
      </svg>
    ),
    name: (
      <svg
        className={Class}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
      </svg>
    ),
    signout: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        id="sign-out-2"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            id="secondary"
            d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H7a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z"
            style={{ fill: "#138fcd" }}
          />
          <path
            id="primary"
            d="M13,21H4a2,2,0,0,1-2-2V5A2,2,0,0,1,4,3h9a2,2,0,0,1,2,2V8a1,1,0,0,1-2,0V5H4V19h9V16a1,1,0,0,1,2,0v3A2,2,0,0,1,13,21Z"
            style={{ fill: "#000000" }}
          />
        </g>
      </svg>
    ),
    dashboard: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
            stroke="#4d4d4d"
            strokeWidth={2}
          />
          <path
            d="M21 9L3 9"
            stroke="#4d4d4d"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21L9 9"
            stroke="#4d4d4d"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    courses: (
      <svg
        className={Class}
        fill="#000000"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M1750.21 0v1468.235h-225.882v338.824h169.412V1920H451.387c-82.447 0-161.506-36.141-214.701-99.388-43.934-51.953-67.652-116.33-67.652-182.965V282.353C169.034 126.494 295.528 0 451.387 0H1750.21Zm-338.823 1468.235H463.81c-89.223 0-166.136 59.86-179.576 140.047-1.242 9.036-2.259 18.07-2.259 27.106v2.26c0 40.658 13.553 77.928 40.659 109.552 32.753 38.4 79.059 59.859 128.753 59.859h960v-112.941H409.599v-112.942h1001.788v-112.94Zm225.882-1355.294H451.387c-92.725 0-169.412 75.67-169.412 169.412v1132.8c50.824-37.27 113.958-59.859 181.835-59.859h1173.46V112.941ZM1354.882 903.53v112.942H564.294V903.529h790.588Zm56.47-564.705v451.764H507.825V338.824h903.529Zm-112.94 112.94H620.765v225.883h677.647V451.765Z"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
    ),
    grades: (
      <svg
        className={Class}
        viewBox="0 0 42 42"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28 17C27.4477 17 27 16.5523 27 16V8H14C12.8954 8 12 8.89543 12 10V38C12 39.1046 12.8954 40 14 40H34C35.1046 40 36 39.1046 36 38V17H28ZM38 16V38C38 40.2091 36.2091 42 34 42H14C11.7909 42 10 40.2091 10 38V10C10 7.79086 11.7909 6 14 6H28L38 16ZM29 9.82843L34.1716 15H29V9.82843Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 33C14 32.4477 14.4477 32 15 32L33 32C33.5523 32 34 32.4477 34 33C34 33.5523 33.5523 34 33 34L15 34C14.4477 34 14 33.5523 14 33Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 37C14 36.4477 14.4477 36 15 36H27C27.5523 36 28 36.4477 28 37C28 37.5523 27.5523 38 27 38H15C14.4477 38 14 37.5523 14 37Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 16C20.4037 16 20.7678 16.2427 20.9231 16.6154L25.9231 28.6154C26.1355 29.1252 25.8944 29.7107 25.3846 29.9231C24.8748 30.1355 24.2894 29.8944 24.0769 29.3846L20 19.6L15.9231 29.3846C15.7107 29.8944 15.1252 30.1355 14.6154 29.9231C14.1056 29.7107 13.8645 29.1252 14.0769 28.6154L19.0769 16.6154C19.2322 16.2427 19.5963 16 20 16Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 25H24V27H16V25Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 22C30.5523 22 31 22.4477 31 23L31 29C31 29.5523 30.5523 30 30 30C29.4477 30 29 29.5523 29 29L29 23C29 22.4477 29.4477 22 30 22Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26 26C26 25.4477 26.4477 25 27 25L33 25C33.5523 25 34 25.4477 34 26C34 26.5523 33.5523 27 33 27L27 27C26.4477 27 26 26.5523 26 26Z"
            fill="#000000"
          />
        </g>
      </svg>
    ),
    chats: (
      <svg
        className={Class}
        viewBox="0 0 256.00098 256.00098"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M228,96.00049a12.01343,12.01343,0,0,0-12-12H180.001v-36a12.01344,12.01344,0,0,0-12-12h-128a12.01343,12.01343,0,0,0-12,12v128a4.00011,4.00011,0,0,0,6.51464,3.11084l38.48243-31.11084H76l.001,36a12.01343,12.01343,0,0,0,12,12h95.00195l38.4834,31.11084a3.9999,3.9999,0,0,0,6.51465-3.11084Zm-156.417,44a4.00176,4.00176,0,0,0-2.51465.88916L36.001,167.62305V48.00049a4.00426,4.00426,0,0,1,4-4h128a4.00427,4.00427,0,0,1,4,4V87.99078l-.001.00971.001.0097v47.9903a4.00428,4.00428,0,0,1-4,4Zm115.34961,48.88916a4.00178,4.00178,0,0,0-2.51465-.88916H88.001a4.00427,4.00427,0,0,1-4-4l-.001-36h84.001a12.01344,12.01344,0,0,0,12-12v-44H216a4.00427,4.00427,0,0,1,4,4l.001,119.62256Z"></path>
        </g>
      </svg>
    ),
    materials: (
      <svg
        className="sidebar-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 8.4666665 8.4666669"
        version="1.1"
        id="svg8"
      >
        <defs id="defs2">
          <pattern
            y="0"
            x="0"
            height="6"
            width="6"
            patternUnits="userSpaceOnUse"
            id="EMFhbasepattern"
          />
          <pattern
            y="0"
            x="0"
            height="6"
            width="6"
            patternUnits="userSpaceOnUse"
            id="EMFhbasepattern-3"
          />
          <pattern
            y="0"
            x="0"
            height="6"
            width="6"
            patternUnits="userSpaceOnUse"
            id="EMFhbasepattern-2"
          />
          <pattern
            y="0"
            x="0"
            height="6"
            width="6"
            patternUnits="userSpaceOnUse"
            id="EMFhbasepattern-1"
          />
          <pattern
            y="0"
            x="0"
            height="6"
            width="6"
            patternUnits="userSpaceOnUse"
            id="EMFhbasepattern-5"
          />
        </defs>
        <g id="layer1" transform="translate(0,-288.53332)">
          <path
            d="m 3.3158606,289.06249 v 0.21648 0.86002 0.39506 H 2.845566 v -0.5829 H 0.52916664 v 0.21311 0.71346 0.21648 0.90046 2.65588 0.21311 0.90383 0.70334 H 2.4390402 2.845566 3.7223864 5.0208772 v -0.99311 -3.94381 l 1.2713893,4.93692 1.6452335,-0.47423 -1.6308855,-6.33099 -1.2857373,0.37063 v -0.97374 z m 0.4065258,0.43043 h 0.8919653 v 0.21311 H 3.7223864 Z m 0,0.64607 h 0.8919653 v 5.33872 H 3.7223864 v -4.94366 z m 2.298863,0.0539 1.4164631,5.50214 -0.8568924,0.24764 -1.4172603,-5.50213 z m -5.08236866,0.18783 H 2.4358519 v 0.49699 H 0.93888074 Z m 1.90668526,0.58627 h 0.4702946 v 4.51071 0.21311 0.35041 H 2.845566 v -0.27375 z m -1.90668526,0.3403 H 2.4358519 v 0.25439 H 0.93888074 Z m 0,0.68736 H 2.4358519 v 2.65588 H 0.93888074 Z m 0,3.08547 H 2.4358519 v 0.25438 H 0.93888074 Z m 0,0.68735 H 2.4358519 v 0.27375 H 0.93888074 Z m 2.78350566,0.13982 h 0.8919653 v 0.13393 H 3.7223864 Z"
            id="rect1108-4"
          />
        </g>
      </svg>
    ),
    add: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM18 12.75H12.75V18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H11.25V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" />
        </g>
      </svg>
    ),
    homework: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            fill="#000000"
            d="M19.71 4.29l-4-4C15.52.1 15.26 0 15 0H6C4.9 0 4 .9 4 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-.26-.1-.52-.29-.71zM15 2.42L17.58 5H15.5c-.28 0-.5-.22-.5-.5V2.42zm3 15.08c0 .28-.22.5-.5.5h-11c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h6c.28 0 .5.22.5.5V5c0 1.1.9 2 2 2h2.5c.28 0 .5.22.5.5v10z"
          />
          <path
            fill="#000000"
            d="M24 16v4.99c0 1.65-1.35 3.01-3 3.01H3c-1.65 0-2.99-1.35-3-3v-5c0-.02 0-.04.01-.06.02-.52.46-.94.99-.94s.97.42.99.94c.01.02.01.04.01.06v4c.01 1.1.91 1.99 2 1.99h16c1.09 0 1.99-.89 2-1.99v-4c0-.02 0-.04.01-.06.02-.52.46-.94.99-.94s.97.42.99.94c.01.02.01.04.01.06z"
          />
          <path
            fill="#000000"
            d="M15 16H9c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zM15 12H9c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zM11 8H9c-.553 0-1-.447-1-1s.447-1 1-1h2c.553 0 1 .447 1 1s-.447 1-1 1z"
          />
        </g>
      </svg>
    ),
    delete: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M10 11V17"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11V17"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    back: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
            fill="#4d80a8"
          />
        </g>
      </svg>
    ),
    send: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            opacity="0.34"
            d="M10.1094 13.6501L13.6894 10.0601"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    ),
    newchat: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Communication / Chat_Circle_Add">
            <path
              id="Vector"
              d="M12 15V12M12 12V9M12 12H9M12 12H15M12.0001 21C10.365 21 8.83174 20.5639 7.51025 19.8018C7.3797 19.7265 7.31434 19.6888 7.25293 19.6719C7.19578 19.6561 7.14475 19.6507 7.08559 19.6548C7.02253 19.6591 6.9573 19.6808 6.82759 19.7241L4.51807 20.4939L4.51625 20.4947C4.02892 20.6572 3.7848 20.7386 3.62256 20.6807C3.4812 20.6303 3.36979 20.5187 3.31938 20.3774C3.26157 20.2152 3.34268 19.9719 3.50489 19.4853L3.50586 19.4823L4.27468 17.1758L4.27651 17.171C4.31936 17.0424 4.34106 16.9773 4.34535 16.9146C4.3494 16.8554 4.34401 16.804 4.32821 16.7469C4.31146 16.6863 4.27448 16.6221 4.20114 16.495L4.19819 16.4899C3.43604 15.1684 3 13.6351 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9707 21 12.0001 21Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </g>
      </svg>
    ),
    open: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z"
            className={Class}
          ></path>
        </g>
      </svg>
    ),
    upload: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M4 16.2422C2.79401 15.435 2 14.0602 2 12.5C2 10.1564 3.79151 8.23129 6.07974 8.01937C6.54781 5.17213 9.02024 3 12 3C14.9798 3 17.4522 5.17213 17.9203 8.01937C20.2085 8.23129 22 10.1564 22 12.5C22 14.0602 21.206 15.435 20 16.2422M8 16L12 12M12 12L16 16M12 12V21"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    download: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            id="secondary"
            d="M16.71,11.29a1,1,0,0,0-1.42,0L13,13.59V3a1,1,0,0,0-2,0V13.59l-2.29-2.3a1,1,0,1,0-1.42,1.42l4,4a1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,16.71,11.29Z"
            style={{ fill: "#ffffff" }}
          />
          <path
            id="primary"
            d="M18.86,22H5.14A2.08,2.08,0,0,1,3,20V16a1,1,0,0,1,2,0v4s.06,0,.14,0H18.86A.22.22,0,0,0,19,20V16a1,1,0,0,1,2,0v4A2.08,2.08,0,0,1,18.86,22Z"
            style={{ fill: "#ffffff" }}
          />
        </g>
      </svg>
    ),
    people: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20.5 21C21.8807 21 23 19.8807 23 18.5C23 16.1726 21.0482 15.1988 19 14.7917M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3M3.5 21.0001H14.5C15.8807 21.0001 17 19.8808 17 18.5001C17 14.4194 11 14.5001 9 14.5001C7 14.5001 1 14.4194 1 18.5001C1 19.8808 2.11929 21.0001 3.5 21.0001ZM13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    newWork: (
      <svg
        className={Class}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <g id="File / File_Add">
            <path
              id="Vector"
              d="M12 18V15M12 15V12M12 15H9M12 15H15M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002"
              stroke="#ffffff"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    ),
  };
  return svgDict[svgName];
}

export default SVGS;
