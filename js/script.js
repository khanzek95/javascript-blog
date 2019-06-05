'use strict';

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


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = 'p.post-author',
  optTagsSelector = '.tags a',
<<<<<<< HEAD
  optPostTagsSelector = '.post-tags .list a',
=======
  optPostTagsSelector = '.post-tags .list a';
>>>>>>> cf64a91213112f65da4bbfafe7d3a375b3b9664a
  optTagsListSelector = '.tags.list';

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
} 

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags){
  
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag of tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } 
     if(tag[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function generateTags(){

<<<<<<< HEAD
  let allTags = {};
=======
  let allTags = [];
>>>>>>> cf64a91213112f65da4bbfafe7d3a375b3b9664a

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
 
  for(let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    articleTagsArray.forEach(function(value) {
      console.log(value);
      });
    for(let tag of articleTagsArray){
      const linkHTML = '  <li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + linkHTML;
<<<<<<< HEAD
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
=======
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
>>>>>>> cf64a91213112f65da4bbfafe7d3a375b3b9664a
      }
    }
    
    titleList.innerHTML = html;
  }

/* [NEW] find list of tags in right column */
const tagList = document.querySelector('.tags');

<<<<<<< HEAD
/* create variable for all link HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams', tagsParams);
let allTagsHTML = '';

/* start LOOP for each tag in allTags; */

for (let tag in allTags){
  /* generate code of a link and add it to allTagsHTML */
  allTagsHTML += '  <li><a href="#tag-"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';
}

/* end LOOP for each tag in allTags; */

/* add html from allTagsHTML to tagList; */
tagList.innerHTML = allTagsHTML

}
=======
/* [NEW] add html from allTags to tagList */
tagList.innerHTML = allTags.join(' ');
}

>>>>>>> cf64a91213112f65da4bbfafe7d3a375b3b9664a


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
   const allArticles = document.querySelectorAll(optArticleSelector);
   for (let eachArticle of allArticles) {
     const authorOfThisArticle = eachArticle.querySelector(optArticleAuthorSelector);
     const authorOfThisArticleOnlyTxt = authorOfThisArticle.innerText;
     const authorOfThisArticleWithoutBy = authorOfThisArticleOnlyTxt.replace('by ', '');
     eachArticle.setAttribute('data-author', authorOfThisArticle);
  }
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
