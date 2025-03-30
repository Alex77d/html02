// 确保页面中的中文字符正确显示
document.addEventListener('DOMContentLoaded', function() {
  // 检查页面编码
  console.log('Document charset: ' + document.characterSet);
  
  // 如果检测到编码问题，强制设置为UTF-8
  if(document.characterSet.toLowerCase() !== 'utf-8') {
    console.warn('Encoding is not UTF-8, might cause display issues');
  }
  
  // 用于调试的函数，可以在控制台查看所有文本元素
  window.debugTextNodes = function() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    let node;
    while(node = walker.nextNode()) {
      if(node.nodeValue.trim().length > 0) {
        textNodes.push({
          node: node,
          text: node.nodeValue,
          parent: node.parentNode.tagName
        });
      }
    }
    
    console.table(textNodes.map(item => ({ 
      text: item.text.slice(0, 30) + (item.text.length > 30 ? '...' : ''),
      parent: item.parent
    })));
    
    return textNodes;
  };
}); 