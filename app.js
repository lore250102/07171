const REGIONS=[
{cn:'东南亚地区',en:'South East Asia',countries:['新加坡','泰国','马来西亚','越南','菲律宾','柬埔寨','缅甸']},
{cn:'东亚地区',en:'East Asia',countries:['日本','韩国','中国台湾','中国香港']},
{cn:'南亚地区',en:'South Asia',countries:['印度','尼泊尔','孟加拉','斯里兰卡']},
{cn:'印尼地区部',en:'Indonesia',countries:['印尼']},
{cn:'澳新地区',en:'ANZ region',countries:['澳大利亚']},
{cn:'独联体地区',en:'CIS region',countries:['俄罗斯','哈萨克斯坦','阿塞拜疆','乌兹别克斯坦']},
{cn:'东北欧地区',en:'Northeast Europe',countries:['罗马尼亚','波兰','芬兰','匈牙利','乌克兰','塞尔维亚','希腊','捷克','瑞典','立陶宛','波黑','北马其顿','摩尔多瓦','克罗地亚','保加利亚','斯洛伐克','斯洛文尼亚']},
{cn:'西欧地区',en:'Western Europe',countries:['奥地利','英国','瑞士','卢森堡','法国','德国','意大利','荷兰','西班牙','比利时','葡萄牙']},
{cn:'中东地区',en:'Middle East',countries:['巴基斯坦','土耳其','阿联酋','卡塔尔','沙特阿拉伯','伊拉克','约旦','阿曼']},
{cn:'非洲地区',en:'Africa',countries:['埃及','肯尼亚','摩洛哥','南非','尼日利亚','突尼斯','坦桑尼亚']},
{cn:'美国',en:'USA',countries:['美国']},
{cn:'拉美地区',en:'Latin America',countries:['墨西哥','秘鲁','智利','巴西','阿根廷','哥伦比亚','危地马拉','玻利维亚','哥斯达黎加','萨尔瓦多','厄瓜多尔','多米尼加','洪都拉斯','尼加拉瓜']}
];
const FLAGS={新加坡:'🇸🇬',泰国:'🇹🇭',马来西亚:'🇲🇾',越南:'🇻🇳',菲律宾:'🇵🇭',柬埔寨:'🇰🇭',缅甸:'🇲🇲',日本:'🇯🇵',韩国:'🇰🇷',中国台湾:'🇹🇼',中国香港:'🇭🇰',印度:'🇮🇳',尼泊尔:'🇳🇵',孟加拉:'🇧🇩',斯里兰卡:'🇱🇰',印尼:'🇮🇩',澳大利亚:'🇦🇺',俄罗斯:'🇷🇺',哈萨克斯坦:'🇰🇿',阿塞拜疆:'🇦🇿',乌兹别克斯坦:'🇺🇿',罗马尼亚:'🇷🇴',波兰:'🇵🇱',芬兰:'🇫🇮',匈牙利:'🇭🇺',乌克兰:'🇺🇦',塞尔维亚:'🇷🇸',希腊:'🇬🇷',捷克:'🇨🇿',瑞典:'🇸🇪',立陶宛:'🇱🇹',波黑:'🇧🇦',北马其顿:'🇲🇰',摩尔多瓦:'🇲🇩',克罗地亚:'🇭🇷',保加利亚:'🇧🇬',斯洛伐克:'🇸🇰',斯洛文尼亚:'🇸🇮',奥地利:'🇦🇹',英国:'🇬🇧',瑞士:'🇨🇭',卢森堡:'🇱🇺',法国:'🇫🇷',德国:'🇩🇪',意大利:'🇮🇹',荷兰:'🇳🇱',西班牙:'🇪🇸',比利时:'🇧🇪',葡萄牙:'🇵🇹',巴基斯坦:'🇵🇰',土耳其:'🇹🇷',阿联酋:'🇦🇪',卡塔尔:'🇶🇦',沙特阿拉伯:'🇸🇦',伊拉克:'🇮🇶',约旦:'🇯🇴',阿曼:'🇴🇲',埃及:'🇪🇬',肯尼亚:'🇰🇪',摩洛哥:'🇲🇦',南非:'🇿🇦',尼日利亚:'🇳🇬',突尼斯:'🇹🇳',坦桑尼亚:'🇹🇿',美国:'🇺🇸',墨西哥:'🇲🇽',秘鲁:'🇵🇪',智利:'🇨🇱',巴西:'🇧🇷',阿根廷:'🇦🇷',哥伦比亚:'🇨🇴',危地马拉:'🇬🇹',玻利维亚:'🇧🇴',哥斯达黎加:'🇨🇷',萨尔瓦多:'🇸🇻',厄瓜多尔:'🇪🇨',多米尼加:'🇩🇴',洪都拉斯:'🇭🇳',尼加拉瓜:'🇳🇮'};
const countryToRegion={};REGIONS.forEach(r=>r.countries.forEach(c=>{if(!countryToRegion[c])countryToRegion[c]=r.cn;}));
const regionToCountries={};REGIONS.forEach(r=>regionToCountries[r.cn]=r.countries);
const allCountries=REGIONS.flatMap(r=>r.countries);

let selectedRegions=[];let selectedCountries=[];let selectedCategories=[];

function init(){
  buildRegionCheckboxes();
  buildCategoryCheckboxes();
  applyFilter();
  document.getElementById('searchInput').addEventListener('input',applyFilter);
  document.getElementById('searchInput').addEventListener('input',function(){
    document.getElementById('searchClearBtn').classList.toggle('hidden',!this.value);
  });
}
function buildRegionCheckboxes(){
  const el=document.getElementById('regionDiv');
  el.innerHTML=REGIONS.map(r=>'<label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded region-cb" value="'+r.cn+'" onchange="toggleRegion(\''+r.cn+'\')"><span class="ml-3 text-gray-700 text-sm">'+r.cn+' '+r.en+'</span></label>').join('');
}
function buildCountryCheckboxes(filtered){
  const list=filtered||allCountries;
  const el=document.getElementById('countryDiv');
  if(!list.length){el.innerHTML='<p class="text-xs text-gray-400 p-2">当前地区下暂无国家数据</p>';return;}
  el.innerHTML=list.map(c=>'<label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded country-cb" value="'+c+'" onchange="toggleCountry(\''+c+'\')"><span class="ml-3 text-gray-700 text-sm">'+(FLAGS[c]||'🌍')+' '+c+'</span></label>').join('');
}
function buildCategoryCheckboxes(){
  const cats=[...new Set(LAWS_DATA.map(l=>l.category))];
  const el=document.getElementById('categoryDiv');
  el.innerHTML=cats.map(c=>'<label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded category-cb" value="'+c+'" onchange="toggleCategory(\''+c+'\')"><span class="ml-3 text-gray-700 text-sm">'+c+'</span></label>').join('');
}
function toggleRegion(r){
  const i=selectedRegions.indexOf(r);
  if(i>=0){
    selectedRegions.splice(i,1);
    const remove=new Set(regionToCountries[r]||[]);
    selectedCountries=selectedCountries.filter(c=>!remove.has(c));
  }else{selectedRegions.push(r);}
  syncUI();applyFilter();
}
function toggleCountry(c){
  const i=selectedCountries.indexOf(c);
  if(i>=0){selectedCountries.splice(i,1);}
  else{
    selectedCountries.push(c);
    const reg=countryToRegion[c];
    if(reg&&selectedRegions.indexOf(reg)<0)selectedRegions.push(reg);
  }
  syncUI();applyFilter();
}
function toggleCategory(c){
  const i=selectedCategories.indexOf(c);
  if(i>=0)selectedCategories.splice(i,1);else selectedCategories.push(c);
  syncUI();applyFilter();
}
function syncUI(){
  document.querySelectorAll('.region-cb').forEach(cb=>cb.checked=selectedRegions.indexOf(cb.value)>=0);
  document.querySelectorAll('.country-cb').forEach(cb=>cb.checked=selectedCountries.indexOf(cb.value)>=0);
  document.querySelectorAll('.category-cb').forEach(cb=>cb.checked=selectedCategories.indexOf(cb.value)>=0);
  const visC=selectedRegions.length?allCountries.filter(c=>{const r=countryToRegion[c];return selectedRegions.indexOf(r)>=0;}):allCountries;
  buildCountryCheckboxes(visC);
  document.querySelectorAll('.country-cb').forEach(cb=>cb.checked=selectedCountries.indexOf(cb.value)>=0);
  const hasF=selectedRegions.length||selectedCountries.length||selectedCategories.length||document.getElementById('searchInput').value;
  document.getElementById('filterResetBtn').classList.toggle('hidden',!hasF);
  document.getElementById('mobileResetBtn').classList.toggle('hidden',!hasF);
  document.getElementById('countryTitle').innerHTML='国家 Country'+(selectedRegions.length?' <span class="text-xs font-normal text-gray-500">（已按地区过滤）</span>':'');
}
function resetAll(){
  selectedRegions=[];selectedCountries=[];selectedCategories=[];
  document.getElementById('searchInput').value='';
  document.getElementById('searchClearBtn').classList.add('hidden');
  syncUI();applyFilter();
}
function applyFilter(){
  let results=LAWS_DATA;
  const q=document.getElementById('searchInput').value.toLowerCase();
  if(q)results=results.filter(l=>(l.law_name+l.article+l.chinese_translation+l.original_text+l.category+l.country+l.region).toLowerCase().includes(q));
  if(selectedCountries.length){const s=new Set(selectedCountries);results=results.filter(l=>s.has(l.country));}
  if(selectedRegions.length){const s=new Set(selectedRegions);results=results.filter(l=>s.has(l.region));}
  if(selectedCategories.length){const s=new Set(selectedCategories);results=results.filter(l=>s.has(l.category));}
  renderResults(results);
}
function renderResults(list){
  const el=document.getElementById('resultList');
  const empty=document.getElementById('emptyState');
  const cnt=document.getElementById('resultCount');
  document.getElementById('statLaws').textContent=LAWS_DATA.length+' 条';
  document.getElementById('statCountries').textContent=allCountries.length+' 个国家';
  if(!list.length){el.innerHTML='';empty.classList.remove('hidden');cnt.innerHTML='';return;}
  empty.classList.add('hidden');
  cnt.innerHTML='找到 <span class="font-bold text-gray-900">'+list.length+'</span> 条法律条款';
  el.innerHTML=list.map(l=>'<div class="rounded-lg border-2 cursor-pointer transition-all '+(l.importance==='high'?'bg-red-50 border-red-200':l.importance==='medium'?'bg-yellow-50 border-yellow-200':'bg-blue-50 border-blue-200')+'" onclick="this.querySelector(\'.detail\').classList.toggle(\'hidden\');this.querySelector(\'.toggleBtn\').textContent=this.querySelector(\'.detail\').classList.contains(\'hidden\')?\'▶ 展开详情\':\'▼ 收起详情\'"><div class="p-5"><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="flex items-center gap-2 mb-2"><span class="text-2xl">'+(FLAGS[l.country]||'🌍')+'</span><div class="flex items-center gap-2"><h3 class="font-bold text-gray-900">'+l.country+'</h3><span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-gray-300 text-gray-700">'+l.article+'</span></div></div><p class="text-sm text-gray-600"><span class="font-semibold">'+l.law_name+'</span> • '+l.category+'</p></div><div class="flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-gray-300"><span class="text-green-600">✓</span><span class="text-xs font-medium text-gray-700">已验证</span></div></div><div class="mb-4 p-4 bg-white rounded-lg border border-gray-200"><h4 class="text-xs font-semibold text-gray-600 mb-2 uppercase">中文翻译</h4><p class="text-gray-800 text-sm leading-relaxed">'+l.chinese_translation+'</p></div><div class="text-center"><button class="text-xs text-blue-600 hover:text-blue-700 font-medium toggleBtn" onclick="event.stopPropagation()">▶ 展开详情</button></div><div class="detail hidden mt-6 pt-6 border-t border-gray-300 space-y-4"><div><h4 class="text-xs font-semibold text-gray-600 mb-2 uppercase">原文 ('+l.original_language+')</h4><p class="text-gray-700 text-sm p-4 bg-gray-50 rounded-lg border border-gray-200 italic max-h-32 overflow-y-auto whitespace-pre-wrap">'+l.original_text+'</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-xs text-gray-600 mb-1">译者</p><p class="font-medium text-gray-900">'+l.translator+'</p></div><div><p class="text-xs text-gray-600 mb-1">最后更新</p><p class="font-medium text-gray-900">'+l.last_updated+'</p></div></div><div><p class="text-xs text-gray-600 mb-2">原始来源</p><a href="'+l.source_url+'" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm break-all" onclick="event.stopPropagation()">'+l.source_url.substring(0,50)+'... 🔗</a></div></div></div></div>').join('');
}
function toggleSec(id){document.getElementById(id).classList.toggle('hidden');}
document.addEventListener('DOMContentLoaded',init);