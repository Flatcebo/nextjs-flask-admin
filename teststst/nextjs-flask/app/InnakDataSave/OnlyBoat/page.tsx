"use client";

export default function Page() {
  return (
    <div>
      <div>OnlyBoat</div>
    </div>
  );
}

// import useSWR from "swr";
// import useMutation from "@/client/useMutation";
// import ExcelDownload from "@/components/ExcelDownload";
// import useMutation from "@/lib/client/useMutation";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// type ExcelDataType = {
//   listSubject: String;
//   listName: String;
//   listDate: Date;
//   listTitle: String;
//   listUserId: String;
// };

// export default function Page() {
//   const [detailON, setDetailOn] = useState<any>(false);
//   // const fetcher = (URI: any) => axios.get(URI).then(res => res.data);
//   const [detailBtnON, setDetailBtnOn] = useState<any>(true);

//   const headers = [
//     {
//       label: "게시일",
//       key: "uploadDate",
//     },
//     {
//       label: "제목",
//       key: "title",
//     },
//     {
//       label: "이름",
//       key: "name",
//     },
//     {
//       label: "지역",
//       key: "country",
//     },
//     { label: "주소", key: "url" },
//     {
//       label: "전화번호",
//       key: "phoneNumber",
//     },
//     {
//       label: "유저 아이디",
//       key: "userId",
//     },
//     {
//       label: "이미지 파일",
//       key: "imageUrl",
//     },
//     {
//       label: "글 번호",
//       key: "listNumber",
//     },
//   ];
//   const { register, handleSubmit } = useForm<any>({
//     defaultValues: { uri: "" },
//   });

//   const [createCrawling, { loading, data, error }] = useMutation(
//     `/api/innakDataSave/onlyBoat`
//   );

//   // const { data: data1 } = useSWR(`/api/crawler`);
//   // const [createCrawling1, { loading: loading1, data: data1, error: error1 }] =
//   //   useMutations(`/api/crawler`);

//   const onSubmits = async (data: any) => {
//     // 1~ 41826 데이터 뽑으면 됨
//     let page = 1;
//     const totalPages = 35; // 총 페이지 수
//     const delayInMilliseconds = 3000;

//     while (true) {
//       if (page >= totalPages) {
//         console.log("break");
//         break;
//       }
//       console.log("페이지 번호 =>", page);
//       const url = `&page=${page}`;
//       const newQuery = { uri: data.uri + url };
//       // console.log("콜랩 함수에서 data =>", newQuery);
//       const result = await createCrawling(newQuery);
//       //   console.log("콜백 함수 렐로우 =>", result);

//       page++;

//       // 1초 지연 시간 주기
//       await new Promise((resolve: any) =>
//         setTimeout(() => {
//           //   console.log("들어오네");
//           resolve();
//         }, delayInMilliseconds)
//       );
//       //   console.log("여기가 오는구나");
//     }
//   };
//   const onclickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
//     setDetailBtnOn(false);
//     // setSendedURI(any => !any);
//     // onClickAllContents(e);
//   };

//   const [uri, setUri] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUri(e.target.value);
//   };
//   // const a = async (addr: string) => {
//   //   return await fetch(`/api/crawler?addr=${encodeURIComponent(addr)}`).then(
//   //     res => res.json()
//   //   );

//   // };

//   const [etc, setEtc] = useState([]);
//   const onClickAllContents = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     setDetailOn(false);
//     const addrs = data.items.map((value: any) => value.listSubject);

//     // console.log(addrs);
//     const list: any = [];
//     for (const it of addrs) {
//       const result = await fetch(
//         `/api/innakDataSave/onlyBoat?addr=${encodeURIComponent(it)}`
//       )
//         .then(res => res.json())
//         .then(res => (res as any).detailItems)
//         .catch(error => console.log("error => ", error));
//       // console.log(result);

//       list.push(result);
//     }
//     setEtc(list);
//     // console.log("setEtc =>", list);
//     alert("상세 데이터 조회 완료");
//     console.log("---------------끝----------------");
//   };

//   // let a = `&page=${0}`
//   //   let add = `&page=${1}`
//   //   while (add ) {

//   //   }

//   function convertAToB(from: any, from2: any, from3: any) {
//     if (from == null || from2 == null || from3 == null) {
//       // alert("널임 확인 좀");
//       return [];
//     }

//     // console.log("from =>", from);
//     // console.log("from 2 =>", from2);
//     // console.log("from 3 =>", from3);
//     return (from as any).items.map((value: any, i: any) => ({
//       // uploadDate: value.listDate.replace("", "`"),
//       name: value.listName ?? "---이름을 표기할 수 없습니다---",
//       url: value.listSubject ?? "",
//       // listNumber: value.listSubject.replace(
//       //   "https://innak.kr/bbs/board.php?bo_table=",
//       //   ""
//       // ),
//       title: (value.listTitle as any) ?? "",
//       userId: value.listUserId,
//       phoneNumber: (from2[i]?.results as Array<string>)?.join(", ") ?? "",
//     }));
//   }

//   // console.log(
//   //   "asdfas ===>",
//   //   etc.map(value => {
//   //     return (value as any).results;
//   //   })
//   // );

//   return (
//     <div className="relative">
//       {detailBtnON ? (
//         <div className="flex">
//           <form onSubmit={handleSubmit(onSubmits)}>
//             <input
//               //   defaultValue="uri"
//               {...register("uri")}
//               type="url"
//               value={uri}
//               onChange={handleChange}
//               className=" w-[1250px] h-[100px] bg-[#0000ff67]"
//             />
//             <button
//               type="submit"
//               className="w-[126px] h-[100px] bg-[#00800067]"
//               onClick={onclickBtn}
//               onSubmit={handleSubmit(onSubmits)}
//             >
//               <strong>검색</strong>
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="flex">
//           <form onSubmit={handleSubmit(onSubmits)}>
//             <input
//               //   defaultValue="uri"
//               {...register("uri")}
//               type="url"
//               value={uri}
//               onChange={handleChange}
//               className=" w-[1250px] h-[100px] bg-[#0000ff67]"
//             />
//             <button
//               type="submit"
//               className="w-[126px] h-[100px] bg-[#00800067]"
//               onClick={onclickBtn}
//               onSubmit={handleSubmit(onSubmits)}
//             >
//               <strong>검색</strong>
//             </button>
//           </form>

//           <button
//             className="bg-[#ffff007d] w-[200px] h-[100px]"
//             onClick={onClickAllContents}
//           >
//             <strong>상세 데이터 조회</strong>
//           </button>
//           <ExcelDownload
//             className="bg-[#ff006f7d] w-[200px] h-[100px]"
//             data={convertAToB(data, etc, data)}
//             // onClick= {}
//             // data={convertBToC(datas)}
//             headers={headers}
//           />
//           {/* <CSVLink
//             className="bg-[#ffff007d] w-[200px] h-[100px]"
//             data={datas}
//             headers={headers}
//           >
//             EXCEL DONWLOAD
//           </CSVLink> */}
//         </div>
//       )}

//       {/* <table>
//         <tbody>
//           <tr>hh</tr>
//           <tr>hh</tr>
//           <tr>hh</tr>
//           <tr>hh</tr>
//         </tbody>
//       </table> */}
//       <div className="relative">
//         <div className="relative flex flex-row">
//           {/* 지역 카테고리 */}
//           {/* <div className="bg-[#9f84845a]">
//             {data &&
//               data.cate.map((cont: any) => {
//                 return (
//                   <div className="outline">
//                     <h2 className="underline text-[#9a9a9a9]">
//                       <Link
//                         href={cont.countryNav.replace(
//                           ".",
//                           "https://innak.kr/bbs"
//                         )}
//                       >
//                         <button>{cont.countryName}</button>
//                       </Link>
//                     </h2>
//                   </div>
//                 );
//               })}
//           </div> */}
//           {/* 리스트 */}
//           {/* <div className="bg-[#67677e39]">
//             {data &&
//               data.items.map((cont: any, i: number) => {
//                 return (
//                   <div className="outline">
//                     <h1 className="underline text-[#9a9a9a9]">
//                       {cont.listName}
//                       {cont.listUserId}
//                     </h1>

//                     {detailON ? (
//                       <div>
//                         <button>
//                           <h2>{cont.listSubject}</h2>
//                           <div></div>
//                         </button>
//                       </div>
//                     ) : (
//                       <div>
//                         <button
//                           onClick={() => {
//                             setDetailOn(true);
//                             return (
//                               <div className="bg-[red]">
//                                 <h1>hihi</h1>
//                               </div>
//                             );
//                           }}
//                         >
//                           <h2>{cont.listSubject}</h2>
//                         </button>
//                       </div>
//                     )}
//                     <h4>{cont.listDate}</h4>
//                   </div>
//                 );
//               })}
//           </div> */}
//         </div>
//         <div className="relative">
//           {etc.map(value => {
//             return (
//               <div className="overflow-y-scroll border-t-[50px] border-[#0000ff56] ">
//                 <div className="">
//                   <div className=" m-[10px] ">{(value as any).detailDesc}</div>
//                   {/* <div className=" m-[10px] ">{(value as any).results}</div> */}
//                   {/* <div className=" m-[10px] ">{(value as any).detailImg}</div> */}
//                   {/* <div>
//                     {(value as any).detailImg.map((img: any) => {
//                       return (
//                         <div className="outline outline-[red]">
//                           <Link
//                             href={""}
//                             onClick={() => {
//                               window.open(img);
//                             }}
//                           >
//                             {img}
//                           </Link>
//                         </div>
//                       );
//                     })}
//                   </div> */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
