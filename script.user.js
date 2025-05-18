// ==UserScript==
// @name         清览云破解复制/粘贴功能
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  清览题库的复制粘贴限制
// @copyright    2025 CreeperDisco(https://github.com/CreeperDisco)
// @homepage     https://github.com/CreeperDisco/
// @homepageURL  https://github.com/CreeperDisco/Qingline-EnableCopy
// @updateURL    https://cdn.jsdelivr.net/gh/CreeperDisco/Qingline-EnableCopy/script.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CreeperDisco/Qingline-EnableCopy/script.user.js
// @author       CreeperDisco
// @license      GPL-3.0
// @supportURL   https://github.com/CreeperDisco/Qingline-EnableCopy/issues
// @match        *://app.qingline.net/*
// @icon         https://app.qingline.net/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // 初始化初始 URL
    let initialUrl = document.location.href;

    // 解除答题区域的复制粘贴限制
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
            e.stopPropagation();
        }
    }, true);

    // 解除题目选中限制
    function enableQuestionCopy() {
        const editors = document.querySelectorAll('.disallowcopy');
        editors.forEach(editor => {
            editor.style.userSelect = 'text';
            editor.style.webkitUserSelect = 'text';
            editor.parentElement.style.userSelect = 'text';
        });
    }

    function showAlert() {
        if (document.querySelector('div.answerArea')) {
            console.log('[破解] 复制粘贴限制已解除');
            // 创建一个新的元素来显示复制成功的消息
            const copySuccessMessage = document.createElement('div');
            copySuccessMessage.textContent = '破解复制成功~';
            copySuccessMessage.style.position = 'fixed';
            copySuccessMessage.style.bottom = '10px';
            copySuccessMessage.style.right = '10px';
            copySuccessMessage.style.padding = '10px';
            copySuccessMessage.style.backgroundColor = '#3d64ff';
            copySuccessMessage.style.color = 'white';
            copySuccessMessage.style.borderRadius = '5px';
            document.body.appendChild(copySuccessMessage);

            // 一段时间后隐藏消息
            setTimeout(function () {
                copySuccessMessage.style.display = 'none';
            }, 2000);
        }
    }

    // 覆盖编辑器配置
    const observerCallback = () => {
        enableQuestionCopy();
        if (initialUrl !== document.location.href) {
            initialUrl = document.location.href;
            setTimeout(() => {
                showAlert();
            }, 1000);
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, { childList: true, subtree: true });

    showAlert();
})();
