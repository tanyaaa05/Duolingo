
import {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
    getUserSubscription,
  } from "@/db/queries";
  
  import { FeedWrapper } from "@/components/feed-wrapper";
  import { StickyWrapper } from "@/components/sticky-wrapper";
  import { Header } from "./header";
  import { UserProgress } from "@/components/user-progress";
  import { redirect } from "next/navigation";
  import Unit from "./unit";
  import { Promo } from "@/components/promo";
  import { Quests } from "@/components/quests";
  
  export default async function LearnPage() {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();
  
    const [
      userProgress,
      units,
      courseProgress,
      lessonPercentage,
      userSubscription,
    ] = await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
      userSubscriptionData,
    ]);
  
    if (!userProgress || !userProgress.activeCourse) {
      redirect("/courses");
    }
  
    if (!courseProgress) {
      redirect("/courses");
    }
  
    const isPro = !!userSubscription;
    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
          {!isPro && <Promo />}
          <Quests points={userProgress.points} />
        </StickyWrapper>
        <FeedWrapper>
          <Header title="Spanish" />
          {units.map((unit) => (
            <div key={unit.id} className="mb-10">
              {/* {JSON.stringify(unit)} */}
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))}
          {/* <div className="space-y-4">
            <div />
          </div> */}
        </FeedWrapper>
      </div>
    );
  }
  