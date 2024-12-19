import Typo from '@/components/Typo'
import { Color } from '@/utils/color'
import { MdError } from 'react-icons/md'
import DonutChart from '@/components/DonutChart'
import VerticalSpace from '@/components/VerticalSpace'
import Card from '@/components/Card'
import HorizontalRule from '@/components/HorizontalRule'
import UnorderedList from '@/components/UnorderedList'
import Image from 'next/image'
import Wave from '@/components/Wave'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 메타데이터 생성을 위해 필요한 데이터 가져오기
  //   const response = await fetch(
  //     `https://api-server-fg5dmxiesa-du.a.run.app/event/2024-year-end-summary?hash=${id}`,
  //   )
  //   const eventData = await response.json()
  return {
    title: `슈퍼멤버스 2024 연말 결산`,
  }
}

export default async function EventPage({ params }: Props) {
  const { id } = await params

  const headers = new Headers()
  const token = headers.get('Authorization')

  const noticeList = [
    '1등 선정시 수령 후기 위주로 작성 부탁드립니다. ( 제품 후기x )',
    '재고 및 상황에 따라 동일한 가격의 사은품으로 변경될 수 있습니다.',
    '모바일 기프티콘의 경우, 유효기간 만료 후 재발송은 불가합니다.',
    '사은품 불량으로 인한 본품/사은품 교환 및 환불은 불가능합니다.',
    '본 이벤트는 당사 사정에 따라 별도 고지없이 변경 또는 중단될 수 있습니다.',
  ]

  const {
    data: { summary },
  } = await fetch(
    `https://api-server-fg5dmxiesa-du.a.run.app/event/2024-year-end-summary?hash=${id}`,
  ).then((res) => res.json())

  return summary?.yourCategories ? (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <Image
            src="/2024-year-end/header.png"
            width={343}
            height={140}
            alt="Year end header"
          />
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
        <Typo fontSize={16} fontWeight={700} fontFamily={'Soyo Maple'}>
          “의미 있는 시간을 함께 되돌아볼까요?”
        </Typo>
        <VerticalSpace height={32} />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div style={styles.summary}>
            <div style={styles.summaryImage}></div>
            <div style={styles.summaryInfo}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typo
                  fontSize={12}
                  fontWeight={600}
                  lineHeight={16}
                  color={'#C2C2C2'}
                >
                  2024.1.1 ~ 2024.12.12 집계 기준
                </Typo>
                <Typo fontSize={21} fontWeight={700} lineHeight={24}>
                  상위
                  {(summary.yourDiscountRankRatio || 0) * 100 <= 0.1
                    ? ' 0.1% 이내'
                    : ` ${((summary.yourDiscountRankRatio || 0) * 100).toFixed(
                        0,
                      )}%`}
                </Typo>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
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
          <div className="flex flex-col gap-4 h-full">
            <Card
              className="flex-1"
              title="가장 많이 할인 받으신 분"
              content={
                <div className="h-full flex items-center justify-center">
                  <Typo fontSize={24} fontWeight={700} lineHeight={24}>
                    {summary?.topDiscountAmount.toLocaleString()}원
                  </Typo>
                </div>
              }
            />

            <Card
              className="flex-1"
              title="자주 이용한 카테고리"
              content={
                <div className="w-full h-full flex items-center justify-center">
                  <DonutChart category={summary?.yourCategories} />
                </div>
              }
            />
            <Card
              className="flex-1"
              title="내가 이용한 캠페인 수"
              content={
                <div className="h-full flex items-center justify-center">
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
          </div>
        </div>
        <VerticalSpace height={32} />
        <button style={styles.button}>
          <Typo color={'#ffffff'}>친구에게 자랑하기</Typo>
        </button>
        {/* <DeepLinkButton /> */}
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
  )
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '960px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: '140px',
    padding: '40px 16px 24px 16px',
    backgroundColor: '#FED333',
  },

  dayInfo: {
    width: '90%',
    minWidth: '343px',
    height: '48px',
    border: '2px solid #3A3A3A',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    userSelect: 'none' as const,
    backgroundColor: '#ffffff',
  },
  dayInfoText: {
    color: Color.primary_light,
  },
  content: {
    width: 'calc(100% - 32px)',
    maxWidth: '960px',
    margin: '0px 16px 0px 16px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },

  summary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    borderRadius: '12px',
    border: `2px solid ${Color.disabled_dark}`,
    overflow: 'hidden',
  },
  summaryImage: {
    width: '100%',
    aspectRatio: '1/1',
    backgroundColor: Color.disabled_light,
    backgroundImage: 'url(/2024-year-end/artwork_1.png)',
    backgroundSize: 'cover',
  },
  summaryInfo: { padding: '24px 16px 32px 16px' },
  button: {
    width: '100%',
    minWidth: '343px',
    height: '48px',
    padding: '14px 0px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    backgroundColor: Color.primary_light,
    userSelect: 'none' as const,
    border: 'none',
  },
  footer: {
    width: '100%',
    height: '153px',
    backgroundColor: Color.disabled_light,
    gap: 4,
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  footerTitle: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
  },
}
