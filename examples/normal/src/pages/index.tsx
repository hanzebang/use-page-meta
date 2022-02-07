import { useEffect } from 'react';
import { usePageMeta } from 'use-page-meta';

import styles from './index.less';

export default function IndexPage() {
  const [pageMeta, setPageMeta] = usePageMeta();
  console.log('pageMeta :>> ', pageMeta);
  useEffect(() => {
    let num = 0;
    setInterval(() => {
      setPageMeta({
        title: `${num++}`,
        icon: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a58456d0331b32f875520f662f28.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646841995&t=0b4946cd4b395ae751445e30f4a480b4"
      })
    }, 5000);
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div>
        <input placeholder='title' id="titleInput" /><button onClick={() => {
          document.title = document.getElementById("titleInput").value
        }}>set</button>
      </div>
      <div>
        <input placeholder='icon' id="iconInput" /><button onClick={() => {
          document.querySelector('link[rel="shortcut icon"]').href = document.getElementById("iconInput").value
        }}>set</button>
      </div>
    </div>
  );
}
