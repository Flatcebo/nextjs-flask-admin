"use client";

// import * as type from '../type'

import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

const ExcelDownload = ({
  startTime,
  endTime,
  data,
  headers,
  filename,
  className,
}: any) => {
  const [exceldata, setExcelData] = useState<any>([]);

  const csvLink = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  useEffect(() => {
    if (exceldata.length > 0) {
      csvLink?.current?.link.click();
      setExcelData({});
    }
  }, [exceldata]);

  return (
    <div>
      {/* <button>액셀 다운로드</button> */}
      <CSVLink
        data={data}
        headers={headers}
        filename={"#Innak-Crawling.csv"}
        className={className}
        ref={csvLink}
        target="_blank"
      >
        액셀 다운로드
      </CSVLink>
    </div>
  );
};

export default ExcelDownload;
