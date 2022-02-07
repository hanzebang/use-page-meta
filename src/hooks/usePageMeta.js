import { useState, useCallback, useEffect, useRef } from 'react';

const usePageMeta = () => {
    const pageMetaRef = useRef({});
    const [pageMeta, setPageMeta] = useState({});

    const mergePageMeta = useCallback((newPageMeta) => {
        setPageMeta((oldPageMeta) => {
            const currentPageMeta = { ...oldPageMeta, ...newPageMeta };
            pageMetaRef.current = currentPageMeta;
            return (currentPageMeta)
        });
    }, []);

    // dom to store
    useEffect(() => {
        const observers = [];
        const config = { subtree: true, characterData: true, childList: true };
        // title observer
        // TODO 直接获取 title 是 null，暂时用 settimeout 延后一下
        setTimeout(() => {
            const target_title = document.querySelector('title');
            if (target_title) {
                const observer_title = new MutationObserver(function (mutations) {
                    if (document.title !== pageMetaRef.current?.title) {
                        mergePageMeta({ title: document.title })
                    }
                });
                observer_title.observe(target_title, config);
                observers.push(observer_title)
            }
        }, 0);

        // icon observer
        // TODO 直接获取 icon 是 null，暂时用 settimeout 延后一下
        setTimeout(() => {
            // TODO 需要 link[rel="shortcut icon"] 先存在
            const target_icon = document.querySelector('link[rel="shortcut icon"]');
            console.log('target_icon :>> ', target_icon);
            if (target_icon) {
                const observer_icon = new MutationObserver(function (mutations) {
                    // TODO icon 变化没监听到
                    if (document.querySelector('link[rel="shortcut icon"]').href !== pageMetaRef.current?.icon) {
                        mergePageMeta({ icon: document.querySelector('link[rel="shortcut icon"]').href })
                    }
                });
                observer_icon.observe(target_icon, config);
                observers.push(observer_icon)
            }
        })

        return () => {
            observers.forEach(obs => obs?.disconnect())
        }
    }, []);

    // store to dom
    useEffect(() => {
        if (document.title !== pageMeta.title) document.title = pageMeta.title;
    }, [pageMeta.title]);
    useEffect(() => {
        if (document.querySelector('link[rel="shortcut icon"]')?.href && document.querySelector('link[rel="shortcut icon"]').href !== pageMeta.icon) {
            document.querySelector('link[rel="shortcut icon"]').href = pageMeta.icon;
        }
    }, [pageMeta.icon]);

    return [pageMeta, mergePageMeta];
};

export { usePageMeta }