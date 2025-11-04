<template>
  <button @click="shareProfile" class="summit-btn share">
    🔗 Share Profile
  </button>
</template>

<script setup>
const shareProfile = async () => {
  const shareData = {
    title: 'Akhil Ramchand - AI/ML Engineer',
    text: 'Hey! Check out this interesting profile I came across at the Bangalore Skill Summit - an AI/ML engineer with a psychology background!',
    url: 'https://akhilr.tech'
  };

  try {
    // Check if Web Share API is supported (works on mobile)
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copy link to clipboard
      await navigator.clipboard.writeText('https://akhilr.tech');
      alert('Link copied to clipboard! Share it anywhere you like.');
    }
  } catch (err) {
    // If user cancels or there's an error
    if (err.name !== 'AbortError') {
      console.error('Error sharing:', err);
      // Final fallback: show prompt with link
      const input = prompt('Copy this link to share:', 'https://akhilr.tech');
    }
  }
};
</script>

<style scoped>
.summit-btn.share {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
  cursor: pointer;
}

.summit-btn.share:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
