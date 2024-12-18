"use client";

const DeepLinkButton = () => {
  const handleOpenApp = () => {
    const deepLink = "supermembers://events/1234"; // 딥링크 URI
    const appStoreLink =
      "https://apps.apple.com/kr/app/%EC%8A%88%ED%8D%BC%EB%A9%A4%EB%B2%84%EC%8A%A4-%EB%84%A4%EC%9D%B4%EB%B2%84%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%9A%A9/id1242322360"; // iOS App Store URL
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=kr.co.mayacrew.supermembers"; // Android Play Store URL
    const fallbackLink = "https://supermembers.co.kr"; // 웹페이지 Fallback URL

    // 딥링크로 앱 실행 시도
    window.location.href = deepLink;

    // 1초 후 앱스토어나 웹페이지로 리디렉션
    setTimeout(() => {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = appStoreLink; // iOS
      } else if (/Android/i.test(navigator.userAgent)) {
        window.location.href = playStoreLink; // Android
      } else {
        window.location.href = fallbackLink; // 기타 플랫폼
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleOpenApp}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Open App
    </button>
  );
};

export default DeepLinkButton;
