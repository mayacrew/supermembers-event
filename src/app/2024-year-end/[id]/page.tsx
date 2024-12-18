import Typo from "@/components/Typo";
import { Color } from "@/utils/color";
import { MdError } from "react-icons/md";
import DonutChart from "../../../components/DonutChart";
import DeepLinkButton from "../../../components/DeepLinkButton";
import VerticalSpace from "@/components/VerticalSpace";
import Card from "@/components/Card";
import HorizontalRule from "@/components/HorizontalRule";
import UnorderedList from "@/components/UnorderedList";
import Image from "next/image";
import Wave from "@/components/Wave";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // params 안전하게 접근

  // 메타데이터 생성을 위해 필요한 데이터 가져오기
  const response = await fetch(
    `https://api-server-fg5dmxiesa-du.a.run.app/event/2024-year-end-summary?hash=${id}`
  );
  const eventData = await response.json();
  // console.log(eventData);
  return {
    title: `Event ${id}`,
    description: `Details for event ${id}`,
    openGraph: {
      title: eventData.title || `Event ${id}`,
      description: eventData.description || `Details for event ${id}`,
      url: `https://your-website.com/2024-year-end/${id}`, // 이벤트 페이지 URL
      type: "website", // 또는 'article' 등 적합한 Open Graph 유형 설정
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/phoz-7f0de/o/notice%2Fevent_test%2Fmain.png?alt=media&token=48f48204-72ae-4550-bae7-37af783cea32",
          width: 1200,
          height: 630,
          alt: eventData.title || "Default Image",
        },
      ],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const noticeList = [
    "1등 선정시 수령 후기 위주로 작성 부탁드립니다. ( 제품 후기x )",
    "재고 및 상황에 따라 동일한 가격의 사은품으로 변경될 수 있습니다.",
    "모바일 기프티콘의 경우, 유효기간 만료 후 재발송은 불가합니다.",
    "사은품 불량으로 인한 본품/사은품 교환 및 환불은 불가능합니다.",
    "본 이벤트는 당사 사정에 따라 별도 고지없이 변경 또는 중단될 수 있습니다.",
  ];

  const category = {
    매장: {
      맛집: {
        기타: 25,
        술집: 4,
        카페: 31,
        "고기/회": 23,
        레스토랑: 13,
        이색요리: 1,
        "피자/버거": 5,
      },
      "패션/생활": { 기타: 1 },
    },
    제품: {
      뷰티: { 기타: 11 },
      생활: { 기타: 5 },
      식품: { none: 3, 식제품: 27, 간편요리: 1, 식사대용: 3 },
      패션: { 기타: 1 },
      디지털: { 기타: 1 },
      유아동: { 기타: 1 },
      "도서/팬시": { 기타: 4 },
    },
  };

  // async function getYearEnd2024() {
  //   if (hashId) {
  //     const result = await httpsApiCallable("getYearEnd2024ByHashId", {
  //       queries: {
  //         hash: hashId,
  //       },
  //     });

  //     if (result.success) {
  //       setYearEndInfo(result.data.summary);
  //     }
  //   }
  // }

  const {
    data: { summary },
  } = await fetch(
    `https://api-server-fg5dmxiesa-du.a.run.app/event/2024-year-end-summary?hash=${id}`
  ).then((res) => res.json());

  // return (
  //   <div>
  //     <h1>Event ID: {id}</h1>
  //     <p>Event Data: {JSON.stringify(summary)}</p>
  //   </div>
  // );
  return summary ? (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          {/* <Image
            src="/src/assets/2024-year-end/header.png"
            width={343}
            height={140}
            alt="Year end header"
          /> */}
          <div style={styles.dayInfo}>
            <Typo>슈퍼멤버스와 함께한지</Typo>
            <Typo
              color={Color.primary_light}
              fontSize={21}
              fontWeight={700}
              lineHeight={28}
            >
              {summary?.yourDaysSinceSignup}
            </Typo>
            <Typo>일 째</Typo>
          </div>
        </div>

        <Wave />
      </div>
      <div style={styles.content}>
        <VerticalSpace height={24} />
        <Typo fontSize={16} fontWeight={700} fontFamily={"Soyo Maple"}>
          “의미 있는 시간을 함께 되돌아볼까요?”
        </Typo>
        <VerticalSpace height={32} />

        <div style={styles.summary}>
          <div style={styles.summaryImage}></div>
          <div style={styles.summaryInfo}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typo
                fontSize={12}
                fontWeight={600}
                lineHeight={16}
                color={"#C2C2C2"}
              >
                2024.1.1 ~ 2024.12.12 집계 기준
              </Typo>
              <Typo fontSize={21} fontWeight={700} lineHeight={24}>
                상위 {(summary.yourDiscountRankRatio || 0) * 10}%
              </Typo>
            </div>
            <VerticalSpace height={16} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Typo fontSize={16} fontWeight={700} lineHeight={20}>
                  지금까지
                </Typo>
                <Typo
                  fontSize={24}
                  fontWeight={700}
                  lineHeight={24}
                  color={Color.primary_light}
                >
                  {summary.yourTotalDiscountAmount?.toLocaleString() ?? 0}원
                </Typo>
              </div>
              <Typo fontSize={16} fontWeight={700} lineHeight={20}>
                할인 받으셨어요
              </Typo>
            </div>
          </div>
        </div>
        <VerticalSpace height={20} />
        <Card
          title="가장 많이 할인 받으신 분"
          content={
            <div>
              <Typo fontSize={24} fontWeight={700} lineHeight={24}>
                {summary?.topDiscountAmount.toLocaleString()}원
              </Typo>
            </div>
          }
        />

        <VerticalSpace height={20} />
        <Card
          title="자주 이용한 카테고리"
          content={
            <div>
              <DonutChart />
            </div>
          }
        />
        <VerticalSpace height={20} />
        <Card
          title="내가 이용한 캠페인 수"
          content={
            <div>
              <Typo
                fontSize={24}
                fontWeight={700}
                lineHeight={24}
                color={Color.primary_light}
              >
                {summary?.yourCampaignCount}개
              </Typo>
            </div>
          }
        />
        <VerticalSpace height={32} />
        <button style={styles.button}>
          <Typo color={"#ffffff"}>친구에게 자랑하기</Typo>
        </button>
        <DeepLinkButton />
        {/* <div>totalCampaignCount:{yearEndInfo?.totalCampaignCount}</div>
          <div>totalDiscountAmount:{yearEndInfo?.totalDiscountAmount}</div>
          <div>topCampaignUser:{yearEndInfo?.topCampaignUser}</div>
          <div>topCampaignCount:{yearEndInfo?.topCampaignCount}</div>
          <div>topDiscountUser:{yearEndInfo?.topDiscountUser}</div>
          <div>topDiscountAmount:{yearEndInfo?.topDiscountAmount}</div>
          <div>yourUsername:{yearEndInfo?.yourUsername}</div>
          <div>yourSignupAt:{yearEndInfo?.yourSignupAt}</div>
          <div>yourDaysSinceSignup:{yearEndInfo?.yourDaysSinceSignup}</div>
          <div>yourMostUsedCategory:{yearEndInfo?.yourMostUsedCategory}</div>
          <div>yourCampaignCount:{yearEndInfo?.yourCampaignCount}</div>
          <div>yourCampaignRank:{yearEndInfo?.yourCampaignRank}</div>
          <div>yourCampaignRankRatio:{yearEndInfo?.yourCampaignRankRatio}</div>
          <div>
            yourTotalDiscountAmount:{yearEndInfo?.yourTotalDiscountAmount}
          </div>
          <div>yourDiscountRank:{yearEndInfo?.yourDiscountRank}</div>
          <div>yourDiscountRankRatio:{yearEndInfo?.yourDiscountRankRatio}</div> */}
        <VerticalSpace height={60} />
        <div style={styles.footer}>
          <Typo
            fontSize={10}
            fontWeight={500}
            lineHeight={18}
            style={styles.footerTitle}
            color={Color.default_dark}
          >
            <MdError size={14} color={Color.default_dark} />
            유의사항
          </Typo>
          <HorizontalRule />
          <UnorderedList
            list={noticeList}
            typography={{
              fontSize: 10,
              fontWeight: 500,
              lineHeight: 18,
              color: Color.default_dark,
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  header: {
    width: "100%",
    maxWidth: "960px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    overflow: "hidden",
  },
  headerTitle: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: "140px",
    padding: "40px 16px 24px 16px",
    backgroundColor: "#FED333",
  },

  dayInfo: {
    width: "90%",
    minWidth: "343px",
    height: "48px",
    border: "2px solid #3A3A3A",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    userSelect: "none" as const,
    backgroundColor: "#ffffff",
  },
  dayInfoText: {
    color: Color.primary_light,
  },
  content: {
    width: "calc(100% - 32px)",
    maxWidth: "960px",
    margin: "0px 16px 0px 16px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },

  summary: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    borderRadius: "12px",
    border: `2px solid ${Color.disabled_dark}`,
  },
  summaryImage: {
    width: "100%",
    aspectRatio: "1/1",
    backgroundColor: Color.disabled_light,
  },
  summaryInfo: { padding: "24px 16px 32px 16px" },
  button: {
    width: "100%",
    minWidth: "343px",
    height: "48px",
    padding: "14px 0px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
    backgroundColor: Color.primary_light,
    userSelect: "none" as const,
    border: "none",
  },
  footer: {
    width: "100%",
    height: "153px",
    backgroundColor: Color.disabled_light,
    gap: 4,
    padding: 16,
    display: "flex",
    flexDirection: "column" as const,
  },
  footerTitle: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: 4,
  },
};
