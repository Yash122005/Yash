const fs = require('fs');

function addLeetCode(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\r\n/g, '\n');
  
  if (filePath.includes('Navbar.tsx')) {
    const desktopTarget = `          <a 
            href="https://github.com/Yash122005" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-300"
          >
            <i className="fa-brands fa-github text-base"></i>
            GitHub
          </a>`;
    const desktopRepl = `          <a 
            href="https://leetcode.com/u/Yash_Gupta1206/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#FFA116]/10 border border-[#FFA116]/20 text-[#FFA116] text-sm font-bold hover:bg-[#FFA116] hover:text-black transition-all duration-300"
          >
            <i className="fa-solid fa-code text-base"></i>
            LeetCode
          </a>
${desktopTarget}`;

    content = content.replace(desktopTarget, desktopRepl);

    const mobileTarget = `              <a 
                href="https://github.com/Yash122005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-3 py-4 rounded-xl bg-white text-black font-bold"
              >
                <i className="fa-brands fa-github text-xl"></i>
                GitHub
              </a>`;
    const mobileRepl = `              <a 
                href="https://leetcode.com/u/Yash_Gupta1206/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-3 py-4 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/20 text-[#FFA116] font-bold"
              >
                <i className="fa-solid fa-code text-xl"></i>
                LeetCode
              </a>
${mobileTarget}`;

    content = content.replace(mobileTarget, mobileRepl);
  } else if (filePath.includes('Footer.tsx')) {
    const footerTarget = `    { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/Yash122005' },`;
    const footerRepl = `    { name: 'LeetCode', icon: 'fa-solid fa-code', url: 'https://leetcode.com/u/Yash_Gupta1206/' },
${footerTarget}`;
    content = content.replace(footerTarget, footerRepl);
  }
  
  fs.writeFileSync(filePath, content);
}

addLeetCode('c:/Users/BIT/OneDrive/Desktop/Right/portfolioAi/components/Navbar.tsx');
addLeetCode('c:/Users/BIT/OneDrive/Desktop/Right/portfolioAi/components/Footer.tsx');
console.log("Replaced successfully!");
