"use client";
import { useEffect, useState } from "react";

interface Categories {
  title: string;
}

interface Data {
  categories: Categories[];
}

export default function Home() {
  const [datas, setDatas] = useState<Data | null>(null);

  useEffect(() => {
    fetch(`/api/read`)
      .then(res => res.json())
      .then((data: Data) => {
        setDatas(data);
        console.log(data);
        return data;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {datas?.categories?.map((item: any, i: any) => (
        <div key={i}>
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import Pagenation from "@/components/Pagenation";
// import Dropdown from "@/components/Dropdown";

// interface Members {
//   name: string;
// }

// interface Data {
//   members: Members[];
// }

// // export default function Home() {
// //   const [datas, setDatas] = useState<Data | null>(null);

// //   useEffect(() => {
// //     fetch(`/api/crawler`)
// //       .then(res => res.json())
// //       .then((data: Data) => {
// //         setDatas(data);
// //         return data;
// //       })
// //       .catch((error: any) => {
// //         console.log(error);
// //       });
// //   }, []);

// //   // console.log(datas);
// //   return (
// //     <div>
// //       {datas?.members.map((member, idx) => (
// //         <div key={idx}>{member.name}</div>
// //       ))}
// //     </div>
// //   );
// // }

// export default function Home() {
//   const [mounted, setMounted] = useState<boolean>(false);
//   const [searchResults, setSearchResults] = useState<any>([]);
//   const [searchData, setSearchData] = useState<any>("");
//   const [pageNumber, setPageNumber] = useState<any>(1);
//   const [selectYear, setSelectYear] = useState<any>("2023");
//   const [selectCate, setSelectCate] = useState<any>("전체");
//   const [selectTheme, setSelectTheme] = useState<any>("선상낚시");
//   const [loading, setLoading] = useState<boolean>(false);

//   const { register, handleSubmit } = useForm();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const fetcher = (
//     cate: any,
//     year: any,
//     theme: any,
//     offset: any,
//     count: any,
//     keyword: any
//   ) => {
//     setLoading(true);
//     fetch(
//       `/api/read?cate=${cate}&year=${year}${theme}&offset=${offset}&count=${count}&keyword=${keyword}`
//     )
//       .then((res: any) => res.json())
//       .then((data: any) => {
//         console.log(data);
//         if (data.categories.length > 0) {
//           console.log("data =======>", data);
//           setSearchResults(data);
//           setLoading(false);

//           return data;
//         } else {
//           setLoading(false);
//           alert("검색 결과가 없습니다.");
//         }
//       })
//       .catch((error: any) => {
//         console.log(error);
//         setLoading(false);
//         alert("검색어를 입력해주세요.");
//       });
//   };

//   const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchData(e.target.value);
//   };

//   const onSubmits = async () => {
//     if (searchData.length < 1) {
//       alert("검색어를 입력해주세요.");
//     }
//     const res = await fetcher(
//       selectCate,
//       selectYear,
//       selectTheme,
//       (pageNumber - 1) * 20,
//       20,
//       searchData
//     );
//   };

//   const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
//     setPageNumber(pageNumber + 1);
//   };
//   const onClickPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (pageNumber === 0) {
//     }
//     setPageNumber(pageNumber - 1);
//   };

//   const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectYear(e);
//   };

//   const onChangeCate = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectCate(e);
//   };
//   const onChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectTheme(e);
//   };

//   return (
//     <div className="relative h-full w-full">
//       {loading ? (
//         <div className="absolute flex w-full h-full justify-center items-center bg-black/50 z-50">
//           <img src="Gear-0.2s-200px (3).gif" className="flex" />
//         </div>
//       ) : null}
//       <div className="pt-[1.5%] mx-[20%] ">
//         <form onSubmit={handleSubmit(onSubmits)}>
//           <div className="flex h-[5rem] ">
//             <label
//               htmlFor="search-dropdown"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white outline"
//             >
//               Your Email
//             </label>

//             {/* 연도 드롭다운 */}

//             <Dropdown
//               mainButtonClassName="flex-shrink-0 z-10 inline-flex items-center justify-evenly w-[8rem] h-[5rem] py-2.5 px-4 text-lg
//                                     font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200
//                                     focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
//                                     dark:text-white dark:border-gray-600"
//               mainButtonDefaultValue={"2023"}
//               mainButtonName={selectYear}
//               mainButtonValue={onChangeYear}
//               button1
//               button1Name={"2023"}
//               button1Click={() => {
//                 setSelectYear("2023");
//               }}
//               button2
//               button2Name={"2022"}
//               button2Click={() => {
//                 setSelectYear("2022");
//               }}
//               button3
//               button3Name={"2021"}
//               button3Click={() => {
//                 setSelectYear("2021");
//               }}
//               dropdownClassName="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700"
//             />

//             <Dropdown
//               mainButtonClassName="flex-shrink-0 z-10 inline-flex items-center justify-evenly w-[8rem] h-[5rem] py-2.5 px-4 text-lg
//                                     font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200
//                                     focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
//                                     dark:text-white dark:border-gray-600"
//               mainButtonDefaultValue={"선상낚시"}
//               mainButtonName={selectTheme}
//               mainButtonValue={onChangeTheme}
//               button1
//               button1Name={"선상낚시"}
//               button1Click={() => {
//                 setSelectTheme("선상낚시");
//               }}
//               button2
//               button2Name={"갯바위"}
//               button2Click={() => {
//                 setSelectTheme("갯바위");
//               }}
//               dropdownClassName="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700"
//             />

//             {/* 카테고리 드롭다운 */}
//             <Dropdown
//               mainButtonClassName="flex-shrink-0 z-10 inline-flex items-center justify-evenly w-[11rem] h-[5rem] py-2.5 px-4 text-lg
//                                     font-medium text-center text-gray-900 bg-gray-100 border border-gray-300  hover:bg-gray-200
//                                     focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
//                                     dark:text-white dark:border-gray-600"
//               mainButtonDefaultValue={"전체"}
//               mainButtonName={selectCate}
//               mainButtonOnChange={onChangeCate}
//               button1
//               button1Click={() => {
//                 setSelectCate("전체");
//               }}
//               button2
//               button1Name={"전체"}
//               button2Click={() => {
//                 setSelectCate("업체명");
//               }}
//               button3
//               button2Name={"업체명"}
//               button3Click={() => {
//                 setSelectCate("유저 아이디");
//               }}
//               button4
//               button3Name={"유저 아이디"}
//               button4Click={() => {
//                 setSelectCate("글제목");
//               }}
//               button5
//               button4Name={"글제목"}
//               button5Click={() => {
//                 setSelectCate("대표번호");
//               }}
//               button5Name={"대표번호"}
//               dropdownClassName="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//             />

//             <div className="relative w-full">
//               <input
//                 type="search"
//                 id="search-dropdown"
//                 className="block p-3.5 w-full h-[5rem] z-20 text-xl text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50
//                 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
//                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                 placeholder="검색어를 입력해주세요."
//                 {...register("searchData")}
//                 value={searchData}
//                 onChange={onSearchInput}
//                 // required
//               />
//               <button
//                 type="submit"
//                 className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border
//                 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
//                 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 <svg
//                   className="w-14 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//                 <span className="sr-only">Search</span>
//               </button>
//             </div>
//           </div>
//           <div className="my-[1.5%]">
//             <Pagenation
//               value={pageNumber}
//               onChange={() => {}}
//               onClickPrev={onClickPrev}
//               onClickNext={onClickNext}
//             />
//           </div>
//         </form>
//       </div>

//       {mounted && (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-[10%] overflow-y-hidden">
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   번호
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   업체명
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   유저 아이디
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   글 제목
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   대표 번호
//                 </th>
//               </tr>
//             </thead>

//             {searchResults?.categories?.map((items: any, i: any) => (
//               <>
//                 <tbody key={i}>
//                   <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 ">
//                     <th
//                       scope="row"
//                       className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       {i + 1}
//                     </th>

//                     <td className="px-6 py-4">{items.userName}</td>
//                     <td className="px-6 py-4">{items.userId}</td>
//                     <td className="px-6 py-4">{items.title}</td>
//                     <td className="px-6 py-4">{items.mainNumber}</td>
//                   </tr>
//                 </tbody>
//               </>
//             ))}
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
