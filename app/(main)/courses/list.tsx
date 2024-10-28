"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses } from './../../../db/schema';
import { upsertUserProgress } from "@/actions/user-progress";
import { Card } from "./card"

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;
        
        if (id === activeCourseId) {
            return router.push("/learn");
        }
        
        startTransition(() => {
            upsertUserProgress(id)
            .catch(() => toast.error("Something went wrong.")
            );
        });
    };
        
    return (
       <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={false}
                    active={course.id === activeCourseId}
                />
            ))}
       </div> 
    );
};



// "use client";

// import { courses } from "@/db/schema";
// import { Card } from "./Card";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";
// import { upsertUserProgress } from "@/actions/user-progress";
// import { toast } from "sonner";

// type Props = {
//   courses: (typeof courses.$inferSelect)[];
//   activeCourseId: number;
// };

// export const List = ({ courses, activeCourseId }: Props) => {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();

//   const onClick = (id: number) => {
//     if (pending) return;

//     if (id === activeCourseId) {
//       return router.push("/learn");
//     }

    // startTransition(() => {
    //   upsertUserProgress(id).catch(() =>
    //     toast.error("Alguma coisa deu errado.")
    //   );
    // });
//     };

//   return (
//     <div className="pt-6 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
//       {courses.map((course) => (
//         <Card
//           key={course.id}
//           id={course.id}
//           title={course.title}
//           imageSrc={course.imageSrc}
//           onClick={onClick}
//           disabled={pending}
//           active={course.id === activeCourseId}
//         />
//       ))}
//     </div>
//   );
// };
