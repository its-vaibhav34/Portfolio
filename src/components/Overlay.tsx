import { sections } from './data'

interface Props {
  section: string
}

type Project = {
  title: string
  description: string
  link: string
}

type Contact = {
  email: string
  linkedin: string
  github: string
}

type Certificate = {
  title: string
  issuer: string
  link: string
}
type Experience = {
  role: string
  company: string
  duration: string
  description: string
}

type Achievement = {
  title: string
  date: string
  description: string
}

export default function Overlay({ section }: Props) {
  if (!section) return null

  const content = sections[section as keyof typeof sections]

  // Type guards for each section to avoid invalid casting and TS errors
  const isProjects = (arr: unknown): arr is Project[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'title' in item &&
        'description' in item &&
        'link' in item
    )

  const isSkills = (arr: unknown): arr is string[] =>
    Array.isArray(arr) && arr.every((item) => typeof item === 'string')

  const isContact = (obj: unknown): obj is Contact =>
    typeof obj === 'object' &&
    obj !== null &&
    'email' in obj &&
    'linkedin' in obj &&
    'github' in obj

  const isCertificates = (arr: unknown): arr is Certificate[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'title' in item &&
        'issuer' in item &&
        'link' in item
    )

  const isExperience = (arr: unknown): arr is Experience[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'role' in item &&
        'company' in item &&
        'duration' in item &&
        'description' in item
    )

  const isAchievements = (arr: unknown): arr is Achievement[] =>
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'title' in item &&
        'date' in item &&
        'description' in item
    )

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-4 capitalize">{section}</h2>

        {/* ✅ Projects */}
        {section === 'projects' && isProjects(content) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.map((proj, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-xl shadow hover:bg-white/20 transition"
              >
                <h3 className="font-semibold text-lg">{proj.title}</h3>
                <p className="text-sm text-gray-300">{proj.description}</p>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-4 py-1 rounded bg-white/20 hover:bg-white/40 transition text-sm"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Skills */}
        {section === 'skills' && isSkills(content) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {content.map((skill, i) => (
              <span
                key={i}
                className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/40 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* ✅ Contact */}
        {section === 'contact' && isContact(content) && (
          <div className="space-y-2 text-sm mt-2">
            <p>
              Email:{' '}
              <a href={`mailto:${content.email}`} className="underline">
                {content.email}
              </a>
            </p>
            <p>
              LinkedIn:{' '}
              <a
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Profile
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Repo
              </a>
            </p>
          </div>
        )}

        {/* ✅ About */}
        {section === 'about' && typeof content === 'string' && (
          <p className="text-lg leading-relaxed text-white/90">{content}</p>
        )}

        {/* ✅ Certificates */}
        {section === 'certificates' && isCertificates(content) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {content.map((cert, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-lg shadow hover:bg-white/20 transition"
              >
                <h3 className="text-lg font-semibold">{cert.title}</h3>
                <p className="text-sm text-gray-300">Issued by {cert.issuer}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline text-sm"
                >
                  View Certificate
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Experience */}
        {section === 'experience' && isExperience(content) && (
          <div className="space-y-4 text-sm">
            {content.map((exp, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-lg shadow hover:bg-white/20 transition">
                <h3 className="text-lg font-semibold">{exp.role} @ {exp.company}</h3>
                <p className="text-gray-300 italic">{exp.duration}</p>
                <p className="mt-1 text-gray-200">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Achievements */}
        {section === 'achievements' && isAchievements(content) && (
          <ul className="space-y-4 text-sm mt-2">
            {content.map((ach, i) => (
              <li key={i} className="bg-white/10 p-4 rounded-xl shadow hover:bg-white/20 transition">
                <h3 className="text-lg font-semibold">{ach.title}</h3>
                <p className="text-gray-300 italic">{ach.date}</p>
                <p className="mt-1 text-gray-200">{ach.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}