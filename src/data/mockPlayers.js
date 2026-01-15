// Mock player data for the SCOUT platform
// 200+ realistic player profiles with all filtering fields

// Import player avatar images
import avatar1 from '../assets/images/1.jpg'
import avatar2 from '../assets/images/2.jpg'
import avatar3 from '../assets/images/3.jpg'
import avatar4 from '../assets/images/4.jpg'
import avatar5 from '../assets/images/5.jpg'
import avatar6 from '../assets/images/6.jpg'
import avatar7 from '../assets/images/7.jpg'
import avatar8 from '../assets/images/8.jpg'

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]

const firstNames = [
  'Marcus', 'João', 'Kylian', 'Erling', 'Bukayo', 'Phil', 'Jude', 'Pedri', 'Gavi',
  'Vinícius', 'Federico', 'Rafael', 'Bruno', 'Kevin', 'Mohamed', 'Harry', 'Trent',
  'Aurélien', 'Rúben', 'William', 'Jamal', 'Eduardo', 'Florian', 'Declan', 'Martin',
  'Leon', 'Christopher', 'Alejandro', 'David', 'Lautaro', 'Paulo', 'Mason', 'Raheem',
  'Jack', 'James', 'Joshua', 'Kai', 'Serge', 'Lucas', 'Antoine', 'Romelu', 'Julian',
  'Victor', 'Dusan', 'Darwin', 'Gabriel', 'Luis', 'Nico', 'Dani', 'Ferran'
]

const lastNames = [
  'Silva', 'Santos', 'Mbappé', 'Haaland', 'Saka', 'Foden', 'Bellingham', 'González',
  'Martínez', 'Júnior', 'Valverde', 'Leão', 'Fernandes', 'De Bruyne', 'Salah', 'Kane',
  'Alexander-Arnold', 'Tchouaméni', 'Dias', 'Saliba', 'Musiala', 'Camavinga', 'Wirtz',
  'Rice', 'Ødegaard', 'Goretzka', 'Nkunku', 'Garnacho', 'Alaba', 'Martínez', 'Dybala',
  'Mount', 'Sterling', 'Grealish', 'Maddison', 'Kimmich', 'Gnabry', 'Paquetá', 'Griezmann',
  'Lukaku', 'Álvarez', 'Osimhen', 'Vlahović', 'Núñez', 'Jesus', 'Díaz', 'Williams', 'Olmo', 'Torres'
]

const clubs = [
  'Manchester City', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'Liverpool', 'Arsenal',
  'Chelsea', 'Paris Saint-Germain', 'Manchester United', 'Atlético Madrid', 'Inter Milan',
  'AC Milan', 'Juventus', 'Tottenham', 'Napoli', 'Borussia Dortmund', 'RB Leipzig',
  'Bayer Leverkusen', 'Newcastle United', 'Brighton', 'Aston Villa', 'West Ham',
  'AS Roma', 'Lazio', 'Sevilla', 'Valencia', 'Ajax', 'PSV Eindhoven', 'Porto',
  'Benfica', 'Sporting CP', 'Monaco', 'Lyon', 'Marseille', 'Wolfsburg', 'Atalanta'
]

const nations = [
  { name: 'England', code: 'gb-eng' },
  { name: 'Spain', code: 'es' },
  { name: 'France', code: 'fr' },
  { name: 'Germany', code: 'de' },
  { name: 'Brazil', code: 'br' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Belgium', code: 'be' },
  { name: 'Italy', code: 'it' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Colombia', code: 'co' },
  { name: 'Serbia', code: 'rs' },
  { name: 'Denmark', code: 'dk' },
  { name: 'Sweden', code: 'se' },
  { name: 'Norway', code: 'no' },
  { name: 'Poland', code: 'pl' },
  { name: 'Austria', code: 'at' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Japan', code: 'jp' },
  { name: 'South Korea', code: 'kr' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Senegal', code: 'sn' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Egypt', code: 'eg' },
  { name: 'Ivory Coast', code: 'ci' },
  { name: 'Ghana', code: 'gh' },
  { name: 'USA', code: 'us' },
  { name: 'Canada', code: 'ca' },
  { name: 'Mexico', code: 'mx' },
  { name: 'Chile', code: 'cl' },
  { name: 'Ecuador', code: 'ec' },
  { name: 'Australia', code: 'au' },
  { name: 'Scotland', code: 'gb-sct' },
  { name: 'Wales', code: 'gb-wls' },
  { name: 'Ireland', code: 'ie' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Greece', code: 'gr' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Slovakia', code: 'sk' },
  { name: 'Ukraine', code: 'ua' },
  { name: 'Russia', code: 'ru' },
  { name: 'Algeria', code: 'dz' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Cameroon', code: 'cm' },
  { name: 'Mali', code: 'ml' },
  { name: 'Finland', code: 'fi' },
  { name: 'Iceland', code: 'is' },
  { name: 'Romania', code: 'ro' }
]

const positions = [
  'Goalkeeper',
  'Right Back',
  'Left Back',
  'Center Back',
  'Defensive Midfielder',
  'Central Midfielder',
  'Attacking Midfielder',
  'Right Winger',
  'Left Winger',
  'Striker'
]

const positionRoles = {
  'Goalkeeper': ['Sweeper Keeper', 'Traditional Keeper', 'Ball Playing Keeper'],
  'Right Back': ['Attacking Full Back', 'Defensive Full Back', 'Inverted Wing Back'],
  'Left Back': ['Attacking Full Back', 'Defensive Full Back', 'Inverted Wing Back'],
  'Center Back': ['Ball Playing Defender', 'Physical Defender', 'Sweeper'],
  'Defensive Midfielder': ['Deep Lying Playmaker', 'Ball Winner', 'Anchor'],
  'Central Midfielder': ['Box-to-Box', 'Playmaker', 'Ball Winner', 'Deep Lying Playmaker'],
  'Attacking Midfielder': ['Playmaker', 'Shadow Striker', 'Trequartista'],
  'Right Winger': ['Inverted Winger', 'Traditional Winger', 'Inside Forward'],
  'Left Winger': ['Inverted Winger', 'Traditional Winger', 'Inside Forward'],
  'Striker': ['Target Man', 'Poacher', 'False Nine', 'Complete Forward']
}

const strongFoot = ['Right', 'Left', 'Both']

// Helper function to generate random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Helper function to generate weighted random number (more realistic distribution)
function weightedRandom(min, max, weight = 2) {
  return Math.floor(min + Math.pow(Math.random(), weight) * (max - min))
}

// Generate player stats for radar chart
function generateStats(position) {
  const baseStats = {
    pace: 50,
    shooting: 50,
    passing: 50,
    dribbling: 50,
    defending: 50,
    physical: 50
  }

  // Position-specific stat modifications
  const modifiers = {
    'Goalkeeper': { pace: -20, shooting: -30, passing: 0, dribbling: -20, defending: 20, physical: 15 },
    'Right Back': { pace: 10, shooting: -10, passing: 5, dribbling: 5, defending: 20, physical: 10 },
    'Left Back': { pace: 10, shooting: -10, passing: 5, dribbling: 5, defending: 20, physical: 10 },
    'Center Back': { pace: -10, shooting: -20, passing: 0, dribbling: -15, defending: 30, physical: 20 },
    'Defensive Midfielder': { pace: 0, shooting: -5, passing: 15, dribbling: 5, defending: 25, physical: 15 },
    'Central Midfielder': { pace: 5, shooting: 5, passing: 20, dribbling: 10, defending: 10, physical: 5 },
    'Attacking Midfielder': { pace: 10, shooting: 15, passing: 20, dribbling: 20, defending: -10, physical: -5 },
    'Right Winger': { pace: 20, shooting: 10, passing: 10, dribbling: 20, defending: -15, physical: 0 },
    'Left Winger': { pace: 20, shooting: 10, passing: 10, dribbling: 20, defending: -15, physical: 0 },
    'Striker': { pace: 10, shooting: 30, passing: 5, dribbling: 10, defending: -20, physical: 10 }
  }

  const positionMods = modifiers[position] || {}
  const stats = {}

  Object.keys(baseStats).forEach(stat => {
    const base = baseStats[stat]
    const mod = positionMods[stat] || 0
    const randomVar = Math.random() * 30 - 15 // -15 to +15 variation
    let value = Math.round(base + mod + randomVar)
    value = Math.max(20, Math.min(99, value)) // Clamp between 20 and 99
    stats[stat] = value
  })

  return stats
}

// Generate market value based on age and overall quality
function generateMarketValue(age, stats) {
  const avgStat = Object.values(stats).reduce((a, b) => a + b, 0) / Object.keys(stats).length
  let baseValue = Math.pow(avgStat / 20, 2.5) * 1000000 // Base on stats exponentially

  // Age factor
  if (age >= 18 && age <= 24) {
    baseValue *= 1.5 // Young talents are worth more
  } else if (age >= 25 && age <= 28) {
    baseValue *= 1.8 // Peak years
  } else if (age >= 29 && age <= 31) {
    baseValue *= 1.2 // Still valuable but declining
  } else if (age >= 32) {
    baseValue *= 0.6 // Declining value
  } else {
    baseValue *= 0.8 // Very young, potential
  }

  // Add randomness
  baseValue *= (0.7 + Math.random() * 0.6) // 70% to 130%

  // Round to reasonable values
  if (baseValue < 100000) {
    return Math.round(baseValue / 10000) * 10000
  } else if (baseValue < 1000000) {
    return Math.round(baseValue / 50000) * 50000
  } else if (baseValue < 10000000) {
    return Math.round(baseValue / 100000) * 100000
  } else {
    return Math.round(baseValue / 1000000) * 1000000
  }
}

// Generate contract expiry date
function generateContractDate() {
  const now = new Date()
  const yearsAhead = Math.random() < 0.15 ? 0 : Math.floor(Math.random() * 5) + 1 // 15% expiring soon
  const months = Math.floor(Math.random() * 12)
  return new Date(now.getFullYear() + yearsAhead, now.getMonth() + months, 1)
}

// Generate injury date
function generateInjuryHistory() {
  const rand = Math.random()
  if (rand < 0.5) {
    // 50% no injury history
    return null
  } else if (rand < 0.8) {
    // 30% injury more than 12 months ago
    const now = new Date()
    const monthsAgo = 12 + Math.floor(Math.random() * 24) // 12-36 months ago
    return new Date(now.getFullYear(), now.getMonth() - monthsAgo, Math.floor(Math.random() * 28) + 1)
  } else {
    // 20% recent injury (within 12 months)
    const now = new Date()
    const monthsAgo = Math.floor(Math.random() * 11) // 0-11 months ago
    return new Date(now.getFullYear(), now.getMonth() - monthsAgo, Math.floor(Math.random() * 28) + 1)
  }
}

// Generate contact information
function generateContact(firstName, lastName) {
  const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'protonmail.com']
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`

  const countryCode = ['+44', '+33', '+49', '+34', '+39', '+351', '+31', '+1', '+55', '+54'][Math.floor(Math.random() * 10)]
  const phone = `${countryCode} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`

  const agentFirstNames = ['David', 'Michael', 'Jorge', 'Mino', 'Jonathan', 'Carlos', 'Paulo', 'Antonio', 'Marco', 'Giovanni']
  const agentLastNames = ['Smith', 'Johnson', 'Mendes', 'Raiola', 'Barnett', 'Rodriguez', 'Silva', 'Santos', 'Martinez', 'Costa']
  const agentName = `${agentFirstNames[Math.floor(Math.random() * agentFirstNames.length)]} ${agentLastNames[Math.floor(Math.random() * agentLastNames.length)]}`
  const agentEmail = `${agentName.toLowerCase().replace(' ', '.')}@sportsagency.com`
  const agentPhone = `${countryCode} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`

  return {
    email,
    phone,
    agent: {
      name: agentName,
      email: agentEmail,
      phone: agentPhone
    }
  }
}

// Generate 200+ players
export function generatePlayers(count = 220) {
  const players = []

  for (let i = 0; i < count; i++) {
    const position = positions[Math.floor(Math.random() * positions.length)]
    const roles = positionRoles[position]
    const preferredRole = roles[Math.floor(Math.random() * roles.length)]
    const nation = nations[Math.floor(Math.random() * nations.length)]

    // Age distribution: more players aged 20-30
    const age = position === 'Goalkeeper'
      ? weightedRandom(18, 38, 1.5)
      : weightedRandom(17, 35, 2)

    // Height based on position
    let heightMin, heightMax
    if (position === 'Goalkeeper' || position === 'Center Back') {
      heightMin = 182
      heightMax = 200
    } else if (position === 'Striker') {
      heightMin = 172
      heightMax = 195
    } else if (position.includes('Winger') || position === 'Attacking Midfielder') {
      heightMin = 165
      heightMax = 185
    } else {
      heightMin = 170
      heightMax = 190
    }
    const height = Math.floor(Math.random() * (heightMax - heightMin + 1)) + heightMin

    const stats = generateStats(position)
    const marketValue = generateMarketValue(age, stats)
    const contractExpires = generateContractDate()
    const lastInjuryDate = generateInjuryHistory()

    const now = new Date()
    const yearDiff = (contractExpires - now) / (1000 * 60 * 60 * 24 * 365)
    const contractExpiringSoon = yearDiff < 1 && yearDiff > 0

    // Small chance of free agent or loan available
    const isFreeAgent = Math.random() < 0.05 && !contractExpiringSoon
    const isLoanAvailable = Math.random() < 0.08 && !isFreeAgent

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const contact = generateContact(firstName, lastName)

    players.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      age,
      position,
      strongFoot: strongFoot[Math.floor(Math.random() * strongFoot.length)],
      height,
      marketValue,
      preferredRole,
      nationality: nation.name,
      nationalityCode: nation.code,
      club: isFreeAgent ? 'Free Agent' : clubs[Math.floor(Math.random() * clubs.length)],
      contractExpires,
      contractExpiringSoon,
      isFreeAgent,
      isLoanAvailable,
      lastInjuryDate,
      photoUrl: avatars[i % avatars.length], // Cycle through local avatar images
      stats,
      contact,
      createdAt: new Date()
    })
  }

  return players
}

// Export the generated players
export const mockPlayers = generatePlayers()

// Helper to get unique values for filters
export const filterOptions = {
  positions,
  strongFoot,
  nations: nations.map(n => ({ label: n.name, value: n.name, code: n.code })),
  roles: Array.from(new Set(Object.values(positionRoles).flat())).sort()
}
