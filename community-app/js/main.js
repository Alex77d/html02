// 更新状态栏时间
function updateStatusBarTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  // 确保分钟是两位数
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  
  // 格式化时间为 HH:MM
  const timeString = `${hours}:${minutes}`;
  
  // 更新所有状态栏时间
  document.querySelectorAll('.status-bar .time').forEach(el => {
    el.textContent = timeString;
  });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  // 初始化状态栏时间
  updateStatusBarTime();
  // 每分钟更新一次时间
  setInterval(updateStatusBarTime, 60000);
  
  // 处理底部导航栏交互
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有活动状态
      tabItems.forEach(tab => tab.classList.remove('active'));
      // 添加当前项目的活动状态
      this.classList.add('active');
      
      // 获取目标页面名称
      const targetPage = this.getAttribute('data-target');
      
      // 如果是在嵌套iframe中，通知父页面
      if (window.parent !== window) {
        window.parent.postMessage({
          action: 'navigateTo',
          page: targetPage
        }, '*');
      }
    });
  });
  
  // 处理轮播切换
  let swiperWrappers = document.querySelectorAll('.swiper-wrapper');
  swiperWrappers.forEach(wrapper => {
    // 简单的自动滚动逻辑
    let scrollPosition = 0;
    const slides = wrapper.querySelectorAll('.swiper-slide');
    const slideWidth = wrapper.offsetWidth;
    
    if (slides.length > 1) {
      setInterval(() => {
        scrollPosition += slideWidth;
        if (scrollPosition >= slideWidth * slides.length) {
          scrollPosition = 0;
        }
        wrapper.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }, 5000);
    }
  });
  
  // 处理搜索框焦点效果
  const searchInputs = document.querySelectorAll('.search-bar input');
  searchInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // 处理文章点赞等交互
  const actionButtons = document.querySelectorAll('.action-button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 切换活动状态
      this.classList.toggle('active');
      
      // 更新计数器
      const counterEl = this.querySelector('.counter');
      if (counterEl) {
        let count = parseInt(counterEl.textContent);
        if (this.classList.contains('active')) {
          count++;
        } else {
          count--;
        }
        counterEl.textContent = count;
      }
    });
  });
  
  // 处理发帖表单
  const postForm = document.querySelector('.post-form');
  if (postForm) {
    postForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // 模拟发帖成功
      alert('发布成功！');
    });
  }
  
  // 处理分类选项卡
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      categoryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// 接收父窗口消息（用于iframe通信）
window.addEventListener('message', function(event) {
  if (event.data.action === 'navigateTo') {
    // 处理导航请求
  }
});

// 模拟加载更多内容
function loadMoreContent() {
  const contentContainer = document.querySelector('.card-section');
  if (contentContainer) {
    // 在实际应用中，这里会异步加载新内容
    setTimeout(() => {
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }, 1500);
  }
} 