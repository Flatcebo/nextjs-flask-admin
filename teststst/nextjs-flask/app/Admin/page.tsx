import Sidebar from "@/components/Sidebar";

// 회원관리 - 업체 정보 - 사용자 정보 - 탈퇴 목록

export default function Page() {
  return (
    <div className="relative w-full h-full">
      <div className="header">
        <div className="bg-[white] w-full h-[5rem]"></div>
      </div>
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="contents">
        <div></div>
      </div>
    </div>
  );
}
