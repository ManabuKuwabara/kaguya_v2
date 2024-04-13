import React from 'react';
import Image from 'next/image'
import LogoIcon from '/public/images/logo.png'; 
import Link from 'next/link'; // Next.jsのLinkコンポーネントをインポート


const TitleBar = () => {
  return (
    <div className="my-4 flex items-center justify-between mx-auto max-w-4xl" style={{ borderBottom: '2px solid gray' }}>
        {/* 左のアイコン */}
        <div className="my-4 flex items-start" > {/* 25% width */}
        <Image src={LogoIcon} alt="logo Icon" width={130} height={130} style={{ marginBottom: '5px' }} />
        </div>
        
        {/* 中央のタイトル */}
        <div className="flex-1" style={{ flex: 2, display: 'flex', justifyContent: 'center' }}> {/* 50% width */}
        <h1 className="text-black text-3xl font-bold">
        </h1>
        </div>
    
        {/* 右のテキスト */}
        <div className="flex-1" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}> {/* 25% width */}
        <Link href="/furniture" className="text-gray-700 font-bold hover:underline" style={{ marginRight: '10px' }}>
        家具屋
        </Link>
        <Link href="/section" className="text-gray-700 font-bold hover:underline" style={{ margin: '0 10px' }}>
        －部
        </Link>
        <Link href="/cart" className="text-gray-700 font-bold hover:underline" style={{ marginLeft: '10px' }}>
        カート
        </Link>
        </div>
    </div>
  );
};

export default TitleBar;
