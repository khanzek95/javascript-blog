'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = 'p.post-author',
  optTagsSelector = '.tags a',
  optPostTagsSelector = '.post-tags .list a',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.author.list',
  optCloudAuthorCount = 5,
  optCloudAuthorPrefix = 'author-size-';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
   const activeLinks = document.querySelectorAll('.titles a.active');
   for(let activeLink of activeLinks){  /* remove class 'active' from all article links  */
   activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active'); /* add class 'active' to the clicked link */
  const activeArticles = document.querySelectorAll('.posts article.active'); /* remove class 'active' from all articles */
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href'); /* get 'href' attribute from the clicked link */
     console.log(articleSelector);
  const targetArticle = document.querySelector(articleSelector);  /* find the correct article using the selector (value of 'href' attribute) */
   console.log(targetArticle);
  targetArticle.classList.add('active');  /* add class 'active' to the correct article */
}

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);   

  titleList.innerHTML = ''; /* remove contents of titleList */
  let html = ''; /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles) {
    article.classList.remove('active');
  
    /* get the article id */

    const articleId = article.getAttribute('id');
     console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
}
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
} 

generateTitleLinks();


function calculateTagsParams(tags){
  
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } 
     if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateAuthorParams(names){

  const params = {
    max: 0,
    min: 999999
  };

  for (let name in names){
    console.log(name + ' writed' + names[name] + ' articles');
    if(names[name] > params.max){
      params.max = names[name];
    }
    if(names[name] < params.min){
      params.min = names[name];
    }
  }
  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  return  optCloudClassPrefix + classNumber;
}

function calculateAuthorClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const authorNumber = Math.floor( percentage * (optCloudAuthorCount - 1) + 1);
  return  optCloudAuthorPrefix + authorNumber;
}


function generateTags(){

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
 
  for(let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const linkHTML = '  <li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + linkHTML;
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    
    titleList.innerHTML = html;
  }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector('.tags');

/* create variable for all link HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams', tagsParams);
let allTagsHTML = '';

/* start LOOP for each tag in allTags; */

for (let tag in allTags){
  /* generate code of a link and add it to allTagsHTML */
  allTagsHTML += ' <li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
}

/* end LOOP for each tag in allTags; */

/* add html from allTagsHTML to tagList; */
tagList.innerHTML = allTagsHTML

}


generateTags();


function tagClickHandler(event){
  event.preventDefault(); /* prevent default action for this event */
  const clickedElement = this; /* make new constant named "clickedElement" and give it the value of "this" */
  const href = clickedElement.getAttribute('href'); /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = href.replace('#tag-', ''); /* make a new constant "tag" and extract tag from the "href" constant */
  const tagLinkActives = document.querySelectorAll('a.active[href^="#tag-"]'); /* find all tag links with class active */
  for(let tagLinkActive of tagLinkActives){  /* START LOOP: for each active tag link */
    tagLinkActive.classList.remove('active');    /* remove class active */
  } /* END LOOP: for each active tag link */
  const eachTagWithHrefs = document.querySelectorAll('a[href="' + href + '"]'); /* find all tag links with "href" attribute equal to the "href" constant */
  for(let eachTagWithHref of eachTagWithHrefs){              /* START LOOP: for each found tag link */
    eachTagWithHref.classList.add('active');   /* add class active */
  }  /* END LOOP: for each found tag link */


   generateTitleLinks('[data-tags~="' + tag + '"]'); /* execute function "generateTitleLinks" with article selector as argument */

}

function generateAuthors() {
  let allAuthors = {};
   const allArticles = document.querySelectorAll(optArticleSelector);
   for (let eachArticle of allArticles) {
     const authorOfThisArticle = eachArticle.querySelector(optArticleAuthorSelector);
     const authorOfThisArticleOnlyTxt = authorOfThisArticle.innerText;
     const authorOfThisArticleWithoutBy = authorOfThisArticleOnlyTxt.replace('by ', '');
     eachArticle.setAttribute('data-author', authorOfThisArticle);
     for (let name of eachArticle){
     const linkHTML = '  <li><a href="#tag-' + name + '"><span>' + name + '</span></a></li>';
      html = html + linkHTML;
      if(!allAuthors.hasOwnProperty(name)){
        /* [NEW] add generated code to allTags array */
        allAuthors[name] = 1;
      } else {
        allAuthors[name]++;
      }
    }
    
    allArticles.innerHTML = html;
  }
  const authorList = document.querySelector('.authors');

  const authorParams = calculateAuthorParams(allAuthors);
console.log('authorParams', authorParams);
let allAuthorsHTML = '';

/* start LOOP for each tag in allTags; */

for (let author in allAuthors){
  /* generate code of a link and add it to allTagsHTML */
  allTagsHTML += ' <li><a class="' + calculateAuthorClass(allAuthors[author], authorParams) + '"href="#tag-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
}

/* end LOOP for each tag in allTags; */

/* add html from allTagsHTML to tagList; */
authorList.innerHTML = allAuthorsHTML
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.getAttribute('href');
  const authorHref = author.replace('#tag-', '');
  const authorLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let authorLinkActive of authorLinksActive){
    authorLinkActive.classList.remove('active');
  }
 const tagsWithHref = document.querySelectorAll('a[data-author"' + href + '"]');
 for (let tagWithHref of tagWithHref){
   eachAuthorWithHref.classList.add('active');
 }

 generateTitleLinks('[data-author="' + authorHref + '"]');
}


function addClickListenersToAuthor() {
  const linkOfAuthors = document.querySelectorAll(optArticleAuthorSelector);

  for (linkOfAuthor of linkOfAuthors) {
    linkOfAuthor.addEventListener('click', authorClickHandler);
  }

}


function addClickListenersToTags(){
  
  
  const linkOfTags = document.querySelectorAll(optTagsSelector); /* find all links to tags */
  const linkOfPostTags = document.querySelectorAll(optPostTagsSelector);

  for (let linkOfTag of linkOfTags) {
    linkOfTag.addEventListener('click', tagClickHandler);
  }

  for (let linkOfPostTag of linkOfPostTags) {
    linkOfPostTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();
