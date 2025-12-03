import React from 'react';
import { Button } from '@/components/ui/button';
// removed missing Progress import
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, FileText, KeyRound, Trophy, Award, Monitor, BrainCircuit, Star, User, Lock, HelpCircle } from 'lucide-react';

type Exercise = {
  num: string;
  title: string;
  status: 'start' | 'locked' | 'completed';
};

type Chapter = {
  id: string;
  number?: number;
  icon?: React.ElementType;
  title: string;
  isClub?: boolean;
  description: string;
  exercises?: Exercise[];
  isProject?: boolean;
  isCertificate?: boolean;
};

const curriculumData: Chapter[] = [
  {
    id: '1',
    number: 1,
    title: 'Hello Mind',
    description:
      'Belajar “mencetak” first line perawatan diri: cek-in emosi & dasar-dasar coping.',
    exercises: [
      { num: 'Exercise 1', title: 'Setting Up (Done!)', status: 'completed' },
      { num: 'Exercise 2', title: 'Hello, Me (Done!)', status: 'completed' },
      { num: 'Exercise 3', title: 'Pattern (+10XP)', status: 'start' },
      { num: 'Exercise 4', title: 'Initials (Start)', status: 'start' },
      { num: 'Exercise 5', title: 'Snail Mail (???)', status: 'locked' },
      { num: 'Bonus Article', title: 'Safe Use Guide (???)', status: 'locked' },
    ],
  },
  {
    id: '2',
    number: 2,
    title: 'Variables',
    description: 'Learn about variables, types, and basic input/output.',
    exercises: [],
  },
  {
    id: '3',
    number: 3,
    title: 'Control Flow',
    description: 'Learn how to use conditionals to control program logic.',
    exercises: [],
  },
  {
    id: '4',
    number: 4,
    title: 'Loops',
    description: 'Learn how to repeat actions using for and while loops.',
    exercises: [],
  },
  {
    id: '5',
    number: 5,
    title: 'Lists',
    description: 'Practice working with lists and list methods.',
    exercises: [],
  },
  {
    id: '6',
    number: 6,
    title: 'Functions',
    description: 'Write reusable functions and understand parameters and return values.',
    exercises: [],
  },
  {
    id: '7',
    number: 7,
    title: 'Classes & Objects',
    description:
      'Learn the basics of object-oriented programming (OOP) and create your own classes and objects.',
    exercises: [],
  },
  {
    id: '9',
    number: 8,
    title: 'Modules',
    isClub: true,
    description:
      "Discover how to use built-in and third-party modules to extend the functionality of your Python programs.",
    exercises: [],
  },
  {
    id: '10',
    icon: Trophy,
    title: 'Final Project',
    isClub: true,
    isProject: true,
    description:
      "Apply everything you've learned by building a final project from scratch. Choose from a variety of challenges and show off your new skills!",
  },
  {
    id: '11',
    icon: Award,
    title: 'Course Certificate',
    isClub: true,
    isCertificate: true,
    description:
      'Congratulations on completing the course! Claim your official certificate of completion to share with your network and potential employers.',
  },
];

const badgeAssets = [
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/hello-world-2.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/variables-3.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/control-flow-4.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/loops-5.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/lists-6.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/functions-7.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/classes-and-objects-8.png',
  'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/icons/modules-9.png',
];

const CourseCurriculum = () => {
  // manage open state per chapter to mimic accordion behavior
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({});
  const toggleOpen = (id: string) => setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header removed */}

        {/* Main Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Collapsible list (accordion-like) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-xl border-2 border-border bg-card p-6 shadow-[0_0_30px_rgba(0,166,255,0.07)]">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
              {curriculumData.map((chapter) => (
                <div key={chapter.id} className="border-b border-border">
                  <button type="button" className="py-4 w-full" onClick={() => toggleOpen(chapter.id)}>
                    <div className="flex w-full items-center gap-4 text-left">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background font-['Space_Grotesk'] font-bold text-lg">
                        {chapter.number ? (
                          <span className="text-foreground">{chapter.number}</span>
                        ) : chapter.icon ? (
                          <chapter.icon className="h-6 w-6 text-foreground" />
                        ) : (
                          <User className="h-6 w-6 text-foreground" />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="font-accent text-2xl font-semibold text-foreground">{chapter.title}</p>
                          <p className="text-sm text-muted-foreground">{chapter.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {chapter.isClub && (
                            <span className="bg-[#7B3FF2] text-white text-xs font-bold uppercase px-3 py-1 rounded-full">CLUB</span>
                          )}
                          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openMap[chapter.id] ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </button>
                  {openMap[chapter.id] && (
                    <div className="pb-6">
                      <div className="space-y-3 pl-[68px]">
                        {chapter.exercises && chapter.exercises.length > 0 ? (
                          chapter.exercises.map((exercise, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-lg border border-border bg-muted p-4"
                            >
                              <div className="flex items-center gap-4 font-mono">
                                <p className="text-sm text-muted-foreground">{exercise.num}</p>
                                <p className="text-sm text-foreground">{exercise.title}</p>
                              </div>
                              <div>
                                {exercise.status === 'start' && (
                                  <Button className="h-8 rounded-sm px-3 py-2 text-xs font-bold">Start</Button>
                                )}
                                {exercise.status === 'completed' && (
                                  <Button variant="secondary" className="h-8 rounded-sm px-3 py-2 text-xs font-bold text-green-500" disabled>
                                    Done!
                                  </Button>
                                )}
                                {exercise.status === 'locked' && (
                                  <Button variant="secondary" className="h-8 rounded-sm px-3 py-2 text-xs font-bold text-muted-foreground" disabled>
                                    ???
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                                <span className="text-xs font-semibold text-foreground">—</span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">Content coming soon</p>
                                <p className="text-sm text-muted-foreground">Exercises will be available shortly.</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" className="h-8 rounded-sm border border-border px-3 py-2 text-xs text-muted-foreground">
                                <HelpCircle className="mr-2 h-3 w-3" /> Notify Me
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-8">
            <Card className="bg-card border-2 border-border rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                    <img src="https://www.codedex.io/_next/image?url=%2Fimages%2Favatar.png&w=48&q=75" alt="User Avatar" width={40} height={40} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Your Name</p>
                    <p className="text-sm text-muted-foreground">Level 1</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-10 bg-transparent border-2 border-border hover:bg-secondary hover:text-white">View Profile</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border rounded-xl">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Monitor className="w-4 h-4" />
                      <span>Exercises</span>
                    </div>
                    <span className="text-foreground">0 / 43</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-md border border-border bg-muted">
                    <div className="h-full bg-gradient-to-r from-accent-blue to-success" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BrainCircuit className="w-4 h-4" />
                      <span>Projects Completed</span>
                    </div>
                    <span className="text-foreground">0 / 2</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-md border border-border bg-muted">
                    <div className="h-full bg-gradient-to-r from-accent-blue to-success" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4" />
                      <span>XP Earned</span>
                    </div>
                    <span className="text-foreground">0 / 685</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-md border border-border bg-muted">
                    <div className="h-full bg-gradient-to-r from-accent-blue to-success" style={{ width: '0%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border rounded-xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-semibold text-foreground">Course Badges</CardTitle>
                <p className="!mt-1 text-sm text-muted-foreground">Complete a chapter to earn a badge — collect 'em all!</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  {badgeAssets.map((src, index) => (
                    <div key={index} className="bg-secondary rounded-md aspect-square flex items-center justify-center p-2 opacity-50">
                      <img src={src} alt={`Badge ${index + 1}`} width={48} height={48} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border rounded-xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-semibold text-foreground">Cheat Sheets</CardTitle>
                <p className="!mt-1 text-sm text-muted-foreground">Quick references to help you learn faster.</p>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Python Syntax</p>
                  </div>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Common Patterns</p>
                  </div>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculum;