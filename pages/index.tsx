import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import AppLayout from "../layout/AppLayout";
import useLandingPage from "../hooks/useLandingPage/useLandingPage";
import Hero from "../components/AppComponents/Hero/Main";
import DefenseSection from "../components/AppComponents/DefenseSection";
import Testimonials from "../components/AppComponents/Testimonials/Main";
import Contact from "../components/AppComponents/Contact/Main";
import Partners from "../components/AppComponents/Partners/Main";
import Posts from "../components/AppComponents/BlogList/Main";
import { BlogPostType, CourseCard } from "../@types";
import * as faker from "faker";
import Product from "../components/AppComponents/Product";
import Courses from "../components/AppComponents/Courses";

export type MenuItem = {
  menuName: string;
  reference: React.RefObject<HTMLElement> | null;
};

const fakeCourseCard = (amount?: number): CourseCard | CourseCard[] => {
  if (amount && amount > 0) {
    let courseCardTempArray: CourseCard[] = [];

    for (let i = 0; i < amount; i++) {
      let courseCardTempInner: CourseCard = {
        imageURL:
          faker.image.business(1366, 768) +
          `?random=${Math.round(Math.random() * 1000)}`,
        subTitle: faker.lorem.word(10),
        title: faker.lorem.word(12),
        to: "#",
      };

      courseCardTempArray.push(courseCardTempInner);
    }

    return courseCardTempArray;
  } else {
    let courseCardTempInner: CourseCard = {
      imageURL:
        faker.image.business(1366, 768) +
        `?random=${Math.round(Math.random() * 1000)}`,
      subTitle: faker.lorem.word(10),
      title: faker.lorem.word(12),
      to: "#",
    };

    return courseCardTempInner;
  }
};

const fakeBlogPost = (amount?: number): BlogPostType | BlogPostType[] => {
  if (amount && amount > 0) {
    let blogPostTempArray: BlogPostType[] = [];

    for (let i = 0; i < amount; i++) {
      let blogPostTempInner: BlogPostType = {
        blogActive: true,
        blogDescription: faker.lorem.paragraph(),
        blogPost: faker.lorem.paragraphs(10),
        blogTitle: faker.lorem.sentence(3),
        featuredImage: {
          imageURL: `${faker.image.business(1366, 768)}?random=${Math.round(
            Math.random() * 1000
          )}`,
          imageDescription: faker.lorem.sentence(4),
        },
        slug: faker.lorem.slug(),
        uuid: faker.datatype.uuid(),
      };

      blogPostTempArray.push(blogPostTempInner);
    }

    return blogPostTempArray;
  } else {
    let blogPostTemp: BlogPostType = {
      blogActive: true,
      blogDescription: faker.lorem.paragraph(),
      blogPost: faker.lorem.paragraphs(10),
      blogTitle: faker.lorem.sentence(3),
      featuredImage: {
        imageURL: faker.image.business(1366, 768),
        imageDescription: faker.lorem.sentence(4),
      },
      slug: faker.lorem.slug(),
      uuid: faker.datatype.uuid(),
    };

    return blogPostTemp;
  }
};

export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const contactSectionRef = React.useRef<HTMLDivElement>(null);

  const { menuList, navigableList } = useLandingPage([
    {
      label: "Hero",
      component: <Hero />,
      ref: null,
      hidden: false,
    },

    {
      label: "Defense section",
      component: <DefenseSection />,
      ref: null,
      hidden: true,
    },

    {
      label: "Serviços",
      component: <Product />,
      ref: null,
      hidden: false,
    },

    {
      label: "Cursos",
      component: <Courses slidersItems={fakeCourseCard(10) as CourseCard[]} />,
      ref: null,
      hidden: false,
    },

    {
      label: "Depoimentos",
      component: <Testimonials />,
      ref: null,
      hidden: true,
    },

    {
      label: "Blog",
      component: <Posts blogPosts={fakeBlogPost(10) as BlogPostType[]} />,
      ref: null,
      hidden: false,
    },

    {
      label: "Contato",
      component: <Contact loadingFn={() => console.log("not now")} />,
      ref: contactSectionRef,
      hidden: false,
    },
    {
      label: "Parceiros",
      component: <Partners />,
      ref: null,
      hidden: false,
    },
  ]);

  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout
        isGlobalLoading={isLoading}
        scrollTopButton
        hideOnScroll
        items={menuList}
      >
        {navigableList.map((navigable, index: number) => {
          return <div key={index}>{navigable}</div>;
        })}
      </AppLayout>
    </React.Fragment>
  );
}
